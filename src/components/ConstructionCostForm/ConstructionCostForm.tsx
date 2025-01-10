import React, { useEffect, useState } from "react";
import { Stack, Text, NumberInput, CloseButton, TextInput, Flex, Button, Fieldset, SegmentedControl, Alert, Notification, Tooltip, HoverCard, ThemeIcon } from "@mantine/core";
import { Select } from "@mantine/core";
import { TbUser, TbBuilding, TbArrowRight } from "react-icons/tb";
import { MdEuro } from "react-icons/md";
import { FaDollarSign, FaPoundSign, FaEuroSign, FaCheck, FaTimes } from "react-icons/fa";
import { toast , ToastContainer} from "react-toastify";
import { TbAlertCircle } from "react-icons/tb";
import { DesignCost, TotalCost, ConstructionCost } from "../../forumlar";
import { MdDesignServices,MdConstruction } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";



const designCost = new DesignCost();
const constructionCost = new ConstructionCost();
const totalCost = new TotalCost();

interface FormValues {
  plotWidth: number;
  plotLength: number;
  noOfFloors: number;
  currency: string;
  unit: string;
  constructionRate: number;
}

interface CalculatedValues {
  siteCost: number;
  designCost: number;
  materialCost: number;
  totalCost: number;
}

interface UserInput {
  email: string;
  phoneNumber: string;
}
interface CalculatedObject{
  grossFloorArea: number;
  totalConstructionCost: number;
  structureCost: number;
  archiCost: number;
  MEPCost: number;
  totalDesignCost: number;
  engineerCost: number;
  designMEPCost: number;
  totalDesignBuild: number;
  fullBudgetDesignBuild: number;
  permitFee: number;
  contingencyCashReserve: number;
  finalConstructionCost: number;
}

function ConstructionCostForm({ isMobile }: { isMobile: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState<CalculatedObject>({
    grossFloorArea: 0,
    totalConstructionCost: 0,
    structureCost: 0,
    archiCost: 0,
    MEPCost: 0,
    totalDesignCost: 0,
    engineerCost: 0,
    designMEPCost: 0,
    totalDesignBuild: 0,
    fullBudgetDesignBuild: 0,
    permitFee: 0,
    contingencyCashReserve: 0,
    finalConstructionCost: 0,
  });


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: {"USD": "USD", "EUR": "EUR", "GBP": "GBP"}[values.currency],
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const [values, setValues] = useState<FormValues>({
    plotWidth: 0,
    plotLength: 0,
    noOfFloors: 0,
    currency: "USD",
    unit: "Meter",
    constructionRate: 450,
  });

  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    phoneNumber: "",
  });




  const handleNumberChange = (field: keyof FormValues, value: number | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value ?? 0,
    }));
  };

  const handleSelectChange = (field: keyof FormValues, value: string | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value ?? prevValues[field],
    }));
  };

  const handleReset = (field: keyof FormValues) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: 0,
    }));
  };

 
  const fields = [
    { label: "Plot Width", name: "plotWidth" as const },
    { label: "Plot Length", name: "plotLength" as const },
    { label: "No. of Floors", name: "noOfFloors" as const },
  ];

  const currencyList = ["USD", "EUR", "GBP"];
  const unit = ["Meter", "Feet"];


  const fieldLegend = (icon: React.ReactNode, Title: string) => {
    return (
      <Flex align="center" gap={10}>{icon} <Text size="sm" fw={700}>{Title}</Text></Flex>
    )
  }

  const constructionParams = {
    buildingWidth: values.plotWidth,
    buildingLength: values.plotLength,
    buildingFloor: values.noOfFloors,
    constructionRate: values.constructionRate,
  }

  const calculatioConstructionCost = ()=> {
    const grossFloorArea = constructionCost.calculateArea(constructionParams);
    //construction Cost
    const totalConstructionCost = constructionCost.calculateTotalCost(constructionParams);
    const structureCost = constructionCost.calculateStructureCost(totalConstructionCost);
    const archiCost = constructionCost.calculateArchiCost(totalConstructionCost);
    const MEPCost = constructionCost.calculateMEPCost(totalConstructionCost);
    //Design Cost
    const totalDesignCost = designCost.calculateDesignCost(totalConstructionCost);
    const engineerCost = designCost.calculateEngineerCost(totalConstructionCost);
    const designMEPCost = designCost.calculateMEPCost(totalConstructionCost);
    const totalDesignBuild = designCost.totalDesignCost(totalDesignCost, engineerCost, designMEPCost);
    //Total Cost
    const fullBudgetDesignBuild= totalCost.fullBudgetDesignBuild(totalConstructionCost, totalDesignBuild);
    const permitFee = totalCost.permitFee(fullBudgetDesignBuild);
    const contingencyCashReserve = totalCost.contingencyCashReserve(fullBudgetDesignBuild);
    const finalConstructionCost = fullBudgetDesignBuild+ permitFee + contingencyCashReserve;

    return {
      grossFloorArea,
      totalConstructionCost,
      structureCost,
      archiCost,
      MEPCost,
      totalDesignCost,
      engineerCost,
      designMEPCost,
      totalDesignBuild,
      fullBudgetDesignBuild,
      permitFee,
      contingencyCashReserve,
      finalConstructionCost,
    }
  }
  const submitToGoogleSheets = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const calculated = calculatioConstructionCost();
      const timestamp = new Date().toISOString();
      
      const formData = {
        timestamp,
        ...values,
        ...calculated,
        ...userInput
      };

      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNJ8hlCy_6CAtJzYiuTfkav0GbzNmPLvqAIJLmtbF0iKPwAVoOJGE4whRyn-V40rcN6w/exec';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setShowNotification(true);
      toast.success('Form submitted successfully!');
      // Auto-hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000);
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculate = () => {
    setShowResults(false);
    setIsSubmitting(true);
    try {
      const result = calculatioConstructionCost();
      setTimeout(() => {
        setShowResults(true);
        setIsSubmitting(false);
        setCalculatedValues(result);
      }, 2000);
    } catch (error) {
      console.error("Error during calculation:", error);
      setIsSubmitting(false);
    }
  };
  
  const calculated = calculatioConstructionCost();
  return (
    <Stack w="100%" align="center">
      <ToastContainer />
      <Stack w={isMobile ? '100%' : '50%'} pos="relative">
        {showNotification && (
          <Notification
            title="Success"
            color="green"
            onClose={() => setShowNotification(false)}
            style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}
          >
            <Flex align="center" gap={8}>
              <FaCheck />
              <Text>Form submitted successfully!</Text>
            </Flex>
          </Notification>
        )}

        <Select
          data={unit}
          label="Select Unit"
          placeholder="Select Unit"
          value={values.unit}
          onChange={(value) => handleSelectChange('unit', value)}
        />
        <Text size="xl" fw={700}>
          Construction Cost Form
        </Text>
        <Fieldset legend={fieldLegend(<TbUser />, "Enter User Details (optional)")}>
          <TextInput
            label="Email"
            placeholder="Enter Email"
            value={userInput.email}
            onChange={(event) => setUserInput({ ...userInput, email: event.target.value })}
          />
          <TextInput
            label="Phone Number"  
            placeholder="Enter Phone Number"
            value={userInput.phoneNumber}
            onChange={(event) => setUserInput({ ...userInput, phoneNumber: event.target.value })}
          />
        </Fieldset>
        <Fieldset legend={fieldLegend(<TbBuilding />, "Enter Plot Details ")}>
          {fields.map((field) => (
            <NumberInput
              suffix={field.name === 'noOfFloors' ? '' : values.unit === 'Feet' ? ' ft' : ' m'}
              key={field.name}
              label={field.label}
              placeholder={`Enter ${field.label}`}
              value={values[field.name] === 0 ? "" : values[field.name]}
              onChange={(value) => handleNumberChange(field.name, value ? Number(value) : 0)}
              hideControls={values[field.name] === 0 || values[field.name] === undefined}
              rightSection={
                values[field.name] !== 0 && (
                  <CloseButton onClick={() => handleReset(field.name)} />
                )
              }
            />
          ))}
        </Fieldset>
        <Flex gap="md" direction={'row-reverse'} align={"center"}>

<Button 
  size="md"
  onClick={handleCalculate}
  loading={isSubmitting}
  disabled={isSubmitting}

  variant="outline"
  rightSection={<TbArrowRight />}
>
  Calculate
</Button>
{/* <HoverCard width={isMobile? '50%': '20%'} shadow="md" withArrow>
  <HoverCard.Target>
    <ThemeIcon size="xl" variant="outline" color="blue.9" bd={0}>
      <TbAlertCircle size={30} />
    </ThemeIcon>
  </HoverCard.Target>
  <HoverCard.Dropdown>
    <Text size="sm" fw={700}>Note:</Text>
    <Text size="sm" >
      you do not have to submit them, however it will help us with our data analytic on construction cost.
    </Text>
  </HoverCard.Dropdown>
</HoverCard>   */}
</Flex>
{submitError && (
<Text color="red" size="sm">
  Error: {submitError}
</Text>
)}
        <Text size="xl" fw={700}>
          Calculation Cost
        </Text>
        <SegmentedControl
          value={values.currency}
          onChange={(value) => handleSelectChange('currency', value)}
          data={[
            { label: (<Flex align={'center'} justify={'center'} gap={5}><FaDollarSign /><Text>USD</Text></Flex>), value: 'USD' },
            { label: (<Flex align={'center'} justify={'center'} gap={5}><FaEuroSign /><Text>EURO</Text></Flex>), value: 'EUR' },
            { label: (<Flex align={'center'} justify={'center'} gap={5}><FaPoundSign /><Text>GBP</Text></Flex>), value: 'GBP' },
          ]}
        />
        <NumberInput
          label="Gross Floor Area"
          value={calculatedValues.grossFloorArea}
          readOnly
          suffix={values.unit === 'Feet' ? ' sqft' : ' sqm'}
        
        />
        <Fieldset legend={fieldLegend(<MdConstruction />, "Construction Cost")}>
          <TextInput
            label="Estimate Structure Cost(≈30% of ECC)"
            value={formatCurrency(calculatedValues.structureCost)}
            readOnly
          />
          <TextInput
            label="Estimate Architecture Work & Interior Finishes Cost (≈50% of ECC)"
            value={formatCurrency(calculatedValues.archiCost)}
            readOnly
          />
          <TextInput
            label="Estimate MEP Cost (≈20% of ECC)"
            value={formatCurrency(calculatedValues.MEPCost)}
            readOnly
          />
          <TextInput
          fw={800}
          variant="unstyled"
            label="Estimate Construction Cost (ECC)"
            value={formatCurrency(calculatedValues.totalConstructionCost)}
            readOnly
          />
          </Fieldset>
          <Fieldset legend={fieldLegend(<MdDesignServices />, "Design Cost")}>
          <TextInput
            label="Building Design Cost (7% of ECC)"
            value={formatCurrency(calculatedValues.totalDesignCost)}
            readOnly
          />
        
          <TextInput
            label="Engineering Design Fee (4% of ECC)"
            value={formatCurrency(calculatedValues.engineerCost)}
            readOnly
          />
          <TextInput
            label="Estimate Architectural Design Fee (2% of ECC)"
            value={formatCurrency(calculatedValues.designMEPCost)}
            readOnly
          />
          <TextInput
            label="Total Design Cost"
            fw={800}
            variant="unstyled"
            value={formatCurrency(calculatedValues.totalDesignBuild)}
            readOnly
          />
          </Fieldset>
          <Fieldset legend={fieldLegend(<FaMoneyBills />, "Estimated Budget for Full Design and Build")}>
          <TextInput
            label="Full Budget Design and Build"
            value={formatCurrency(calculatedValues.fullBudgetDesignBuild)}
            readOnly
          />
          <TextInput
            label="Permit Fee, Licences Fee, Admisnistration & Insurance"
            value={formatCurrency(calculatedValues.permitFee)}
            readOnly
          />
          <TextInput
            label="Contingency Cash Reserve"
            value={formatCurrency(calculatedValues.contingencyCashReserve)}
            readOnly
          />

          </Fieldset>
        <TextInput
          label="Total Project Cost"
          size="xl"
          fw={800}
          variant="unstyled"
          value={"≈ " + formatCurrency(calculatedValues.finalConstructionCost)}
          readOnly
        />
 
      </Stack>

    </Stack>
  );
}

export default ConstructionCostForm;