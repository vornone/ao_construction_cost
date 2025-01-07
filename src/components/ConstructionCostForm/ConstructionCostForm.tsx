import React, { useEffect, useState } from "react";
import { Stack, Text, NumberInput, CloseButton, TextInput, Flex, Button, Fieldset, SegmentedControl, Alert, Notification } from "@mantine/core";
import { Select } from "@mantine/core";
import { TbUser, TbBuilding } from "react-icons/tb";
import { MdEuro } from "react-icons/md";
import { FaDollarSign, FaPoundSign, FaEuroSign, FaCheck, FaTimes } from "react-icons/fa";
import { toast , ToastContainer} from "react-toastify";
interface FormValues {
  plotWidth: number;
  plotLength: number;
  noOfFloors: number;
  currency: string;
  unit: string;
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

function ConstructionCostForm({ isMobile }: { isMobile: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

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
    unit: "Feet",
  });

  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    phoneNumber: "",
  });

  const calculateValues = (): CalculatedValues => {
    const siteCost = values.plotWidth * values.plotLength * values.noOfFloors;
    const designCost = siteCost * 0.1;
    const materialCost = siteCost * 0.5;
    const totalCost = siteCost + designCost + materialCost;
    const euroValue= 1.2
    const poundValue= 0.75

    if(values.currency === "EUR"){
      return {
        siteCost: siteCost * euroValue,
        designCost: designCost * euroValue,
        materialCost: materialCost * euroValue,
        totalCost: totalCost * euroValue,
      }
    }
    if(values.currency === "GBP"){
      return {
        siteCost: siteCost * poundValue,
        designCost: designCost * poundValue,
        materialCost: materialCost * poundValue,
        totalCost: totalCost * poundValue
      }
    }
    return {
      siteCost,
      designCost,
      materialCost,
      totalCost,
    };
  };

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

  const submitToGoogleSheets = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const calculated = calculateValues();
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

  const fields = [
    { label: "Plot Width", name: "plotWidth" as const },
    { label: "Plot Length", name: "plotLength" as const },
    { label: "No. of Floors", name: "noOfFloors" as const },
  ];

  const currencyList = ["USD", "EUR", "GBP"];
  const unit = ["Feet", "Meter"];
  const calculated = calculateValues();

  const fieldLegend = (icon: React.ReactNode, Title: string) => {
    return (
      <Flex align="center" gap={10}>{icon} <Text size="sm" fw={700}>{Title}</Text></Flex>
    )
  }

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
        <TextInput
          label="Site Cost"
          value={formatCurrency(calculated.siteCost)}
          readOnly
        />
        <TextInput
          label="Design Cost (10%)"
          value={formatCurrency(calculated.designCost)}
          readOnly
        />
        <TextInput
          label="Material Cost (50%)"
          value={formatCurrency(calculated.materialCost)}
          readOnly
        />
        <TextInput
          label="Total Cost"
          size="xl"
          fw={800}
          variant="unstyled"
          value={formatCurrency(calculated.totalCost)}
          readOnly
        />
        <Flex gap="md" direction={'row-reverse'}>
          <Button 
            size="md"
            onClick={submitToGoogleSheets}
            loading={isSubmitting}
            disabled={isSubmitting}
            color="blue.9"
          >
            Submit
          </Button>
        </Flex>
        {submitError && (
          <Text color="red" size="sm">
            Error: {submitError}
          </Text>
        )}
      </Stack>

    </Stack>
  );
}

export default ConstructionCostForm;