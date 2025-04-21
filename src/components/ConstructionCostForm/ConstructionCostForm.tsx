import React, { useEffect, useState } from 'react';
import { FaMoneyBills } from 'react-icons/fa6';
import { MdConstruction, MdDesignServices, MdEuro } from 'react-icons/md';
import { TbAlertCircle, TbArrowDown, TbArrowRight, TbBuilding, TbUser } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import {
  Autocomplete,
  Button,
  CloseButton,
  Fieldset,
  Flex,
  Group,
  HoverCard,
  NumberInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import {useForm } from '@mantine/form';
import { ConstructionCost, DesignCost, TotalCost } from '../../forumlar';
import emailjs from 'emailjs-com';
import { useMantineColorScheme } from '@mantine/core';

const designCost = new DesignCost();
const constructionCost = new ConstructionCost();
const totalCost = new TotalCost();

interface FormValues {
  plotWidth: number;
  plotLength: number;
  noOfFloors: number;
  currency: string;
  unit: string;
  constructionRate: '';
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
interface CalculatedObject {
  grossFloorArea: number;
  totalConstructionCost: number;
  structureCost: number;
  archiCost: number;
  MEPcost: number;
  interiorCost: number;
  totalDesignCost: number;
  engineerCost: number;
  designMEPCost: number;
  totalDesignBuild: number;
  fullBudgetDesignBuild: number;
  permitFee: number;
  contingencyCashReserve: number;
  finalConstructionCost: number;
}

const percentageField = [
  {
    value: '450',
    structure: 0.33,
    archi: 0.46,
    MEP: 0.21,
  },
  {
    value: '750',
    structure: 0.29,
    archi: 0.5,
    MEP: 0.21,
  },
  {
    value: '970',
    structure: 0.28,
    archi: 0.51,
    MEP: 0.21,
  },
  {
    value: 'other',
    structure: 0.3,
    archi: 0.5,
    MEP: 0.2,
  },
];
function ConstructionCostForm({ isMobile }: { isMobile: boolean }) {
  const { colorScheme } = useMantineColorScheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [rate, setRate] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);
  const [percentage, setPercentage] = useState({ structure: 0.3333, archi: 0.4667, MEP: 0.2 });
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>({
    plotWidth: 0,
    plotLength: 0,
    noOfFloors: 0,
    currency: 'USD',
    unit: 'Meter',
    constructionRate: '',
  });
  const [calculatedValues, setCalculatedValues] = useState<CalculatedObject>({
    grossFloorArea: 0,
    totalConstructionCost: 0,
    structureCost: 0,
    archiCost: 0,
    interiorCost: 0,
    MEPcost: 0,
    totalDesignCost: 0,
    engineerCost: 0,
    designMEPCost: 0,
    totalDesignBuild: 0,
    fullBudgetDesignBuild: 0,
    permitFee: 0,
    contingencyCashReserve: 0,
    finalConstructionCost: 0,
  });
  const [userInput, setUserInput] = useState<UserInput>({
    email: '',
    phoneNumber: '',
  });

  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
      phoneNumber: (value) => (/^\d{9,15}$/.test(value) ? null : 'Invalid phone number'),
    },
  });

  useEffect(() => {
    if (values.constructionRate !== '' && values.constructionRate === '$450 (Normal Rate)') {
      setRate(450);
      setPercentage(percentageField[0]);
    } else if (values.constructionRate !== '' && values.constructionRate === '$750 (Good Rate)') {
      setRate(750);
      setPercentage(percentageField[1]);
    } else if (
      values.constructionRate !== '' &&
      values.constructionRate === '$970 (Excellent Rate)'
    ) {
      setRate(970);
      setPercentage(percentageField[2]);
    } else if (!isNaN(Number(values.constructionRate))) {
      setRate(Number(values.constructionRate));
      setPercentage(percentageField[3]);
    } else if (!isNaN(Number(values.constructionRate)) && values.constructionRate !== '') {
      setRate(0);
      setPercentage(percentageField[3]);
    }
  }, [values]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: { USD: 'USD', EUR: 'EUR', GBP: 'GBP' }[values.currency],
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
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

  const fields = [
    { label: 'Building Width', name: 'plotWidth' as const },
    { label: 'Building Length', name: 'plotLength' as const },
    { label: 'No. of Floors', name: 'noOfFloors' as const },
  ];


  const fieldLegend = (icon: React.ReactNode, Title: string) => {
    return (
      <Flex align="center" gap={10}>
        {icon}{' '}
        <Text size="sm" fw={700}>
          {Title}
        </Text>
      </Flex>
    );
  };

  const constructionParams = {
    buildingWidth: values.plotWidth,
    buildingLength: values.plotLength,
    buildingFloor: values.noOfFloors,
    constructionRate: rate,
  };

  const calculatioConstructionCost = () => {
    const grossFloorArea = constructionCost.calculateArea(constructionParams);
    //construction Cost
    const totalConstructionCost = constructionCost.calculateTotalCost(constructionParams);
    const structureCost = constructionCost.calculateStructureCost(
      totalConstructionCost,
      percentage.structure
    );
    const archiCost = constructionCost.calculateArchiCost(totalConstructionCost, percentage.archi);
    const MEPcost = constructionCost.calculateMEPCost(totalConstructionCost, percentage.MEP);
    const interiorCost = constructionCost.calculateInteriorCost(totalConstructionCost, 0);
    //Design Cost
    const totalDesignCost = designCost.calculateDesignCost(totalConstructionCost);
    const engineerCost = designCost.calculateEngineerCost(totalConstructionCost);
    const designMEPCost = designCost.calculateMEPCost(totalConstructionCost);
    const totalDesignBuild = designCost.totalDesignCost(
      totalDesignCost,
      engineerCost,
      designMEPCost
    );
    //Total Cost
    const fullBudgetDesignBuild = totalCost.fullBudgetDesignBuild(totalConstructionCost, 0);
    const permitFee = totalCost.permitFee(fullBudgetDesignBuild);
    const contingencyCashReserve = totalCost.contingencyCashReserve(fullBudgetDesignBuild);
    const finalConstructionCost = fullBudgetDesignBuild + permitFee + contingencyCashReserve;
    return {
      grossFloorArea,
      totalConstructionCost,
      structureCost,
      archiCost,
      MEPcost,
      interiorCost,
      totalDesignCost,
      engineerCost,
      designMEPCost,
      totalDesignBuild,
      fullBudgetDesignBuild,
      permitFee,
      contingencyCashReserve,
      finalConstructionCost,
    };
  };

  const handleCalculate = () => {
    if (values.noOfFloors <= 0 || values.plotWidth <= 0 || values.plotLength <= 0 || rate < 350) {
      toast.error('Please fill in all the required fields.');
      setInvalidInput(true);
    } else {
      setShowResults(false);
      setIsSubmitting(true);
      try {
        const result = calculatioConstructionCost();
        setTimeout(() => {
          setShowResults(true);
          setIsSubmitting(false);
          setCalculatedValues(result);
        }, 1000);
      } catch (error) {
        console.error('Error during calculation:', error);
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (userInput:UserInput) => {
    setSubmitError(null);
    if(calculatedValues.finalConstructionCost === 0){
      toast.error('please do the calculation before submitting');
      setInvalidInput(true);
      return
    }
    try {
      const templateParams = {
        to_email: form.values.email,
        phone_number: form.values.phoneNumber,
        building_width: values.plotWidth,
        building_length: values.plotLength,
        no_of_floors: values.noOfFloors,
        construction_rate: rate,
        gross_floor_area: calculatedValues.grossFloorArea,
        total_construction_cost: formatCurrency(calculatedValues.totalConstructionCost),
        permit_fee: formatCurrency(calculatedValues.permitFee),
        contingency_reserve: formatCurrency(calculatedValues.contingencyCashReserve),
        final_cost: formatCurrency(calculatedValues.finalConstructionCost),
        from_name: "Keha Team",
        message:`
        email: ${form.values.email}
        phone number: ${form.values.phoneNumber}
        Building Width: ${values.plotWidth} Meter
        Building Length: ${values.plotLength} Meter
        No. of Floors: ${values.noOfFloors}
        Construction Rate: ${rate} $
        Gross Floor Area: ${calculatedValues.grossFloorArea} sqm
        Total Construction Cost: ${calculatedValues.totalConstructionCost}$
        Permit Fee: ${calculatedValues.permitFee}$
        Contingency Cash Reserve: ${calculatedValues.contingencyCashReserve}$
        Final Cost: ${calculatedValues.finalConstructionCost}$
        
        `,
      };

      const response = await emailjs.send(
        'service_shtl94g',
        'template_5m7m3oi',
        templateParams,
        '_IXciVI8-bRIgu3FM'
      );

      if (response.status === 200) {
        setShowNotification(true);
        toast.success('Cost estimate sent successfully!');
        form.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('Failed to send email. Please try again.');
      toast.error('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} with value: ${value}`);
    
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Stack w="100%" align="center">
      <ToastContainer  theme={colorScheme === 'dark' ? 'dark' : 'light'}/>
      <Stack w={isMobile ? '100%' : '100%'} pos="relative">
        <Text size="xl" fw={700}>
          Construction Cost Form
        </Text>
        <Fieldset legend={fieldLegend(<TbBuilding />, t("enterBuildingDetails"))}>
        <Stack>
          {fields.map((field) => (
            <NumberInput
              allowNegative={false}
              error={
                invalidInput && values[field.name] === 0
                  ? 'Number cannot be empty or zero'
                  : undefined
              }
              allowDecimal={field.name !== 'noOfFloors'}
              suffix={field.name === 'noOfFloors' ? '' : values.unit === 'Feet' ? ' ft' : ' m'}
              key={field.name}
              label={t(field.name)}
              placeholder={`Enter ${field.label}`}
              value={values[field.name] === 0 ? '' : values[field.name]}
              onChange={(value) => handleNumberChange(field.name, value ? Number(value) : 0)}
              hideControls={values[field.name] === 0 || values[field.name] === undefined}
              rightSection={
                values[field.name] !== 0 && <CloseButton onClick={() => handleReset(field.name)} />
              }
            />
          ))}

          <Autocomplete
            type="number"
            prefix="$"
            value={rate.toString() === '' ? '' : rate.toString()}
            rightSection={rate !== 0 && <CloseButton onClick={() => setRate(0)} />}
            error={
              invalidInput && rate < 350 ? 'Number cannot be empty or less than 350' : undefined
            }
            label={
              <Flex align="center" gap={5}>
                {' '}
                <Text size="sm">
                  {t('constructionRate')} ($/m<sup>2</sup>)
                </Text>
                <HoverCard width={isMobile ? '50%' : '20%'} shadow="md" withArrow position="top">
                  <HoverCard.Target>
                    <ThemeIcon size="xs" variant="outline" color="yellow" bd={0}>
                      <TbAlertCircle size={16} />
                    </ThemeIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm" fw={700}>
                      Note:
                    </Text>
                    <Text size="sm">
                      The Options of Construction Rate are based in Phnom Penh City, Cambodia. if
                      the rate in your region is different, please input your own rate.
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
            }
            placeholder="Enter Construction Rate"
            data={['$450 (Normal Rate)', '$750 (Good Rate)', '$970 (Excellent Rate)']}
            onChange={(value) => handleSelectChange('constructionRate', value)}
          />
          <Flex gap="md" direction={'row-reverse'} align={'center'} pt={10}>
            <Button
              size="sm"
              onClick={handleCalculate}
              loading={isSubmitting}
              disabled={isSubmitting}
              variant="filled"
              color="yellow.9"
              rightSection={<TbArrowDown />}
              radius={'lg'}
            >
              {t('calculate')}
            </Button>
          </Flex>
          </Stack>
        </Fieldset>

        {submitError && (
          <Text color="red" size="sm">
            Error: {submitError}
          </Text>
        )}
        <Text size="xl" fw={700}>
          Cost Calculation
        </Text>


        <Fieldset legend={fieldLegend(<MdConstruction />, t('constructionCost'))} >
          <Stack>
          <NumberInput
          label={t('grossFloorArea')}
          value={calculatedValues.grossFloorArea.toFixed(2)}
          readOnly
          suffix={values.unit === 'Feet' ? ' sqft' : ' sqm'}
        />
          <TextInput
            label={t('structureCost')}
            value={formatCurrency(calculatedValues.structureCost)}
            readOnly
          />
          <TextInput
            label={t('archiCost')}
            value={formatCurrency(calculatedValues.archiCost)}
            readOnly
          />
          <TextInput
            label={t('MEPCost')}
            value={formatCurrency(calculatedValues.MEPcost)}
            readOnly
          />
          <TextInput
            fw={800}
            variant="unstyled"
            label={t('totalConstructionCost')}
            value={formatCurrency(calculatedValues.totalConstructionCost)}
            readOnly
          />
          </Stack>
        </Fieldset>
        <Fieldset
          legend={fieldLegend(<FaMoneyBills />, t('miscellaneousCashReserve'))}
        >
          <Stack>
          <TextInput
            label={t('permitFee')}
            value={formatCurrency(calculatedValues.permitFee)}
            readOnly
          />
          <TextInput
            label={t('contingencyCashReserve')}
            value={formatCurrency(calculatedValues.contingencyCashReserve)}
            readOnly
          /></Stack>
        </Fieldset>
        <TextInput
          ml={25}
          label={t('finalConstructionCost')}
          size="xl"
          fw={800}
          variant="unstyled"
          value={'Est. ' + formatCurrency(calculatedValues.finalConstructionCost)}
          readOnly
        />
        {/* <Fieldset legend={fieldLegend(<TbUser />, t('enterUserDetails'))}>
        <form  onSubmit={form.onSubmit(() => handleSubmit(userInput))}>
          <Stack>
            <TextInput
              label={t('email')}
              placeholder="Enter Email"
              value={userInput.email}
              {...form.getInputProps('email', {
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInput({ ...userInput, email: event.target.value }),
              })}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              type="number"
              label={t('phoneNumber')}
              placeholder="Enter Phone Number"
              value={userInput.phoneNumber}
              key={form.key('phoneNumber')}
              {...form.getInputProps('phoneNumber', {
                onChange: {handleUserChange}} )}
            />
            <Group justify={'flex-end'} pt={10}>
              <Button
                size="sm"
                variant="filled"
                color="yellow.9"
                rightSection={<TbArrowRight />}
                radius={'lg'}
                type="submit"
              >
                {t('submit')}
              </Button>
            </Group>
            </Stack>
          </form>
        </Fieldset> */}
      </Stack>
    </Stack>
  );
}

export default ConstructionCostForm;
