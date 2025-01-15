// import React, { useEffect, useState } from "react";
// import { Stack, Text, NumberInput, CloseButton, TextInput, Flex, Button, Fieldset, SegmentedControl, Alert, Notification, Tooltip, HoverCard, ThemeIcon, Autocomplete } from "@mantine/core";
// import { Select } from "@mantine/core";
// import { TbUser, TbBuilding, TbArrowRight, TbArrowDown } from "react-icons/tb";
// import { MdEuro } from "react-icons/md";
// import { FaDollarSign, FaPoundSign, FaEuroSign, FaCheck, FaTimes } from "react-icons/fa";
// import { toast , ToastContainer} from "react-toastify";
// import { TbAlertCircle } from "react-icons/tb";
// import { DesignCost, TotalCost, ConstructionCost } from "../../forumlar";
// import { MdDesignServices,MdConstruction } from "react-icons/md";
// import { FaMoneyBills } from "react-icons/fa6";
// import NumberSelector from './../NumberSelector/NumberSelector';


// const designCost = new DesignCost();
// const constructionCost = new ConstructionCost();
// const totalCost = new TotalCost();

// interface FormValues {
//   plotWidth: number;
//   plotLength: number;
//   noOfFloors: number;
//   currency: string;
//   unit: string;
//   constructionRate: "";
// }

// interface CalculatedValues {
//   siteCost: number;
//   designCost: number;
//   materialCost: number;
//   totalCost: number;
// }

// interface UserInput {
//   email: string;
//   phoneNumber: string;
// }
// interface CalculatedObject{
//   grossFloorArea: number;
//   totalConstructionCost: number;
//   structureCost: number;
//   archiCost: number;
//   MEPcost: number;
//   interiorCost: number;
//   totalDesignCost: number;
//   engineerCost: number;
//   designMEPCost: number;
//   totalDesignBuild: number;
//   fullBudgetDesignBuild: number;
//   permitFee: number;
//   contingencyCashReserve: number;
//   finalConstructionCost: number;
// }


// function ConstructionCostForm({ isMobile }: { isMobile: boolean }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [rate, setRate] = useState(0);
//   const [invalidInput, setInvalidInput] = useState(false);
//   const [values, setValues] = useState<FormValues>({
//     plotWidth: 0,
//     plotLength: 0,
//     noOfFloors: 0,
//     currency: "USD",
//     unit: "Meter",
//     constructionRate: "",
//   });

//   const [userInput, setUserInput] = useState<UserInput>({
//     email: "",
//     phoneNumber: "",
//   });
//   const percentageField =[
//   {
//     value: "450",
//     structure: 0.3333,
//     archi:0.4667,
//     MEP:0.2,
//   },
//   {
//     value: "750",
//     structure: 0.2933,
//     archi:0.5067,
//     MEP:0.2,
//   }

// ]

//   const [calculatedValues, setCalculatedValues] = useState<CalculatedObject>({
//     grossFloorArea: 0,
//     totalConstructionCost: 0,
//     structureCost: 0,
//     archiCost: 0,
//     interiorCost: 0,
//     MEPcost: 0,
//     totalDesignCost: 0,
//     engineerCost: 0,
//     designMEPCost: 0,
//     totalDesignBuild: 0,
//     fullBudgetDesignBuild: 0,
//     permitFee: 0,
//     contingencyCashReserve: 0,
//     finalConstructionCost: 0,
//   });

//   useEffect(() => {
//     if (values.constructionRate !== "" && values.constructionRate === "$450 (Normal Rate)") {
//       setRate(450);
//     } else if (values.constructionRate !== "" && values.constructionRate === "$750 (Good Rate)") {
//       setRate(750);
//     } else if (values.constructionRate !== "" && values.constructionRate === "$970 (Excellent Rate)") {
//       setRate(970);
//     }else if (!isNaN(Number(values.constructionRate))) {
//       setRate(Number(values.constructionRate));
//     }else if (!isNaN(Number(values.constructionRate)) && values.constructionRate !== "") {
//       setRate(0);
//     }
//   }, [values]);

//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: {"USD": "USD", "EUR": "EUR", "GBP": "GBP"}[values.currency],
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   };

//   const handleNumberChange = (field: keyof FormValues, value: number | null) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [field]: value ?? 0,
//     }));
//   };

//   const handleSelectChange = (field: keyof FormValues, value: string | null) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [field]: value ?? prevValues[field],
//     }));
  
//   };
//   useEffect(() => {
//     console.log(values);
//   }, [values]);
//   const handleReset = (field: keyof FormValues) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [field]: 0,
//     }));
//   };

 
//   const fields = [
//     { label: "Building Width", name: "plotWidth" as const },
//     { label: "Building Length", name: "plotLength" as const },
//     { label: "No. of Floors", name: "noOfFloors" as const },
//   ];

//   const currencyList = ["USD", "EUR", "GBP"];
//   const unit = ["Meter", "Feet"];


//   const fieldLegend = (icon: React.ReactNode, Title: string) => {
//     return (
//       <Flex align="center" gap={10}>{icon} <Text size="sm" fw={700}>{Title}</Text></Flex>
//     )
//   }

//   const constructionParams = {
//     buildingWidth: values.plotWidth,
//     buildingLength: values.plotLength,
//     buildingFloor: values.noOfFloors,
//     constructionRate: rate ,
//   }

//   const calculatioConstructionCost = ()=> {
//     const grossFloorArea = constructionCost.calculateArea(constructionParams);
//     //construction Cost
//     const totalConstructionCost = constructionCost.calculateTotalCost(constructionParams);
//     const structureCost = constructionCost.calculateStructureCost(totalConstructionCost);
//     const archiCost = constructionCost.calculateArchiCost(totalConstructionCost);
//     const MEPcost = constructionCost.calculateMEPCost(totalConstructionCost);
//     const interiorCost = constructionCost.calculateInteriorCost(totalConstructionCost);
//     //Design Cost
//     const totalDesignCost = designCost.calculateDesignCost(totalConstructionCost);
//     const engineerCost = designCost.calculateEngineerCost(totalConstructionCost);
//     const designMEPCost = designCost.calculateMEPCost(totalConstructionCost);
//     const totalDesignBuild = designCost.totalDesignCost(totalDesignCost, engineerCost, designMEPCost);
//     //Total Cost
//     const fullBudgetDesignBuild= totalCost.fullBudgetDesignBuild(totalConstructionCost, 0);
//     const permitFee = totalCost.permitFee(fullBudgetDesignBuild);
//     const contingencyCashReserve = totalCost.contingencyCashReserve(fullBudgetDesignBuild);
//     const finalConstructionCost = fullBudgetDesignBuild+ permitFee + contingencyCashReserve;

//     return {
//       grossFloorArea,
//       totalConstructionCost,
//       structureCost,
//       archiCost,
//       MEPcost,
//       interiorCost,
//       totalDesignCost,
//       engineerCost,
//       designMEPCost,
//       totalDesignBuild,
//       fullBudgetDesignBuild,
//       permitFee,
//       contingencyCashReserve,
//       finalConstructionCost,
//     }
//   }
//   const submitToGoogleSheets = async () => {
//     try {
//       setIsSubmitting(true);
//       setSubmitError(null);
//       const calculated = calculatioConstructionCost();
//       const timestamp = new Date().toISOString();
      
//       const formData = {
//         timestamp,
//         ...values,
//         ...calculated,
//         ...userInput
//       };

//       const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNJ8hlCy_6CAtJzYiuTfkav0GbzNmPLvqAIJLmtbF0iKPwAVoOJGE4whRyn-V40rcN6w/exec';
      
//       const response = await fetch(SCRIPT_URL, {
//         method: 'POST',
//         mode: 'no-cors',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       setShowNotification(true);
//       toast.success('Form submitted successfully!');
//       // Auto-hide notification after 5 seconds
//       setTimeout(() => setShowNotification(false), 5000);
//     } catch (error) {
//       toast.error('An error occurred while submitting the form.');
//       setSubmitError(error instanceof Error ? error.message : 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCalculate = () => {
//     if(values.noOfFloors <=0 || values.plotWidth <=0 || values.plotLength <=0 || rate <450) {
//       toast.error('Please fill in all the required fields.');
//       setInvalidInput(true);
      
//     }
//     else {
//       setShowResults(false);
//       setIsSubmitting(true);
//       try {
//         const result = calculatioConstructionCost();
//         setTimeout(() => {
//           setShowResults(true);
//           setIsSubmitting(false);
//           setCalculatedValues(result);
//         }, 2000);
//       } catch (error) {
//         console.error("Error during calculation:", error);
//         setIsSubmitting(false);
//       }
//     }
//   };
  
//   const calculated = calculatioConstructionCost();
//   return (
//     <Stack w="100%" align="center">
//       <ToastContainer />
//       <Stack w={isMobile ? '100%' : '100%'} pos="relative">
//         {showNotification && (
//           <Notification
//             title="Success"
//             color="green"
//             onClose={() => setShowNotification(false)}
//             style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}
//           >
//             <Flex align="center" gap={8}>
//               <FaCheck />
//               <Text>Form submitted successfully!</Text>
//             </Flex>
//           </Notification>
//         )}
//         {/* <Select
//           data={unit}
//           label="Select Unit"
//           placeholder="Select Unit"
//           value={values.unit}
//           onChange={(value) => handleSelectChange('unit', value)}
//         /> */}
//         <Text size="xl" fw={700}>
//           Construction Cost Form
//         </Text>
        
//         <Fieldset legend={fieldLegend(<TbBuilding />, "Enter Building Details ")}>
//           {fields.map((field) => (
//             <NumberInput
//               allowNegative={false}
//               error={invalidInput && values[field.name] === 0 ? 'Number cannot be empty or zero' : undefined}
//               suffix={field.name === 'noOfFloors' ? '' : values.unit === 'Feet' ? ' ft' : ' m'}
//               key={field.name}
//               label={field.label}
//               placeholder={`Enter ${field.label}`}
//               value={values[field.name] === 0 ? "" : values[field.name]}
//               onChange={(value) => handleNumberChange(field.name, value ? Number(value) : 0)}
//               hideControls={values[field.name] === 0 || values[field.name] === undefined}
//               rightSection={
//                 values[field.name] !== 0 && (
//                   <CloseButton onClick={() => handleReset(field.name)} />
//                 )
//               }
//             />
//           ))}
//           <Autocomplete
//           type="number"
//           prefix="$"
//           value={rate.toString() === "" ? "" : rate.toString()}
//           rightSection={
//                           rate !== 0 && (
//                             <CloseButton onClick={() => setRate(0)} />
//                           )
//                         }
//             error={invalidInput && rate < 450 ? 'Number cannot be empty or less than 450' : undefined}
//             label={<Flex align="center" gap={5}> <Text size="sm">Construction Rate ($/m<sup>2</sup>)</Text><HoverCard width={isMobile? '50%': '20%'} shadow="md" withArrow position="top">
//               <HoverCard.Target> 
//                 <ThemeIcon size="xs" variant="outline" color="yellow" bd={0}>
//                   <TbAlertCircle size={16} />
//                 </ThemeIcon>
//               </HoverCard.Target>
//               <HoverCard.Dropdown>
//                 <Text size="sm" fw={700}>Note:</Text>
//                 <Text size="sm">
//                   The Options of Construction Rate are based in Phnom Penh City, Cambodia. if the rate in your region is different, please input your own rate.
//                 </Text>
//               </HoverCard.Dropdown>
//             </HoverCard></Flex> }
//             placeholder="Enter Construction Rate"
//             data={["$450 (Normal Rate)", "$750 (Good Rate)", "$970 (Excellent Rate)"]}
//             onChange={(value) => handleSelectChange('constructionRate', value)}
//           />
//         </Fieldset>
//         <Flex gap="md" direction={'row-reverse'} align={"center"}>

// <Button 
//   size="sm"
//   onClick={handleCalculate}
//   loading={isSubmitting}
//   disabled={isSubmitting}
//   variant="gradient"
//   gradient={{ from: 'orange', to: 'yellow.9' }}
//   rightSection={<TbArrowDown />}
// >
//   Calculate
// </Button>
// {/* <HoverCard width={isMobile? '50%': '20%'} shadow="md" withArrow>
//   <HoverCard.Target>
//     <ThemeIcon size="xl" variant="outline" color="blue.9" bd={0}>
//       <TbAlertCircle size={30} />
//     </ThemeIcon>
//   </HoverCard.Target>
//   <HoverCard.Dropdown>
//     <Text size="sm" fw={700}>Note:</Text>
//     <Text size="sm" >
//       you do not have to submit them, however it will help us with our data analytic on construction cost.
//     </Text>
//   </HoverCard.Dropdown>
// </HoverCard>   */}
// </Flex>
// {submitError && (
// <Text color="red" size="sm">
//   Error: {submitError}
// </Text>
// )}
//         <Text size="xl" fw={700}>
//           Cost Calculation
//         </Text>
//         {/* <SegmentedControl
//           value={values.currency}
//           onChange={(value) => handleSelectChange('currency', value)}
//           data={[
//             { label: (<Flex align={'center'} justify={'center'} gap={5}><FaDollarSign /><Text>USD</Text></Flex>), value: 'USD' },
//             { label: (<Flex align={'center'} justify={'center'} gap={5}><FaEuroSign /><Text>EURO</Text></Flex>), value: 'EUR' },
//             { label: (<Flex align={'center'} justify={'center'} gap={5}><FaPoundSign /><Text>GBP</Text></Flex>), value: 'GBP' },
//           ]}
//         /> */}
//         <NumberInput
//           label="Gross Floor Area"
//           value={calculatedValues.grossFloorArea.toFixed(2)}
//           readOnly
//           suffix={values.unit === 'Feet' ? ' sqft' : ' sqm'}
        
//         />
//         <Fieldset legend={fieldLegend(<MdConstruction />, "Construction Cost")}>
//           <TextInput
//             label="Estimate Structure Cost"
//             value={formatCurrency(calculatedValues.structureCost)}
//             readOnly
//           />
//           <TextInput
//             label="Estimate Architecture Work "
//             value={formatCurrency(calculatedValues.archiCost)}
//             readOnly
//           />
//           <TextInput
//             label="Estimate Interior Finishes Cost "
//             value={formatCurrency(calculatedValues.interiorCost)}
//             readOnly
//           />
//           <TextInput
//             label="Estimate MEP Cost "
//             value={formatCurrency(calculatedValues.MEPcost)}
//             readOnly
//           />
//           <TextInput
//           fw={800}
//           variant="unstyled"
//             label="Estimate Construction Cost (ECC)"
//             value={formatCurrency(calculatedValues.totalConstructionCost)}
//             readOnly
//           />
//           </Fieldset>
//           {/* <Fieldset legend={fieldLegend(<MdDesignServices />, "Design Cost")}>
//           <TextInput
//             label="Building Design Cost (7% of ECC)"
//             value={formatCurrency(calculatedValues.totalDesignCost)}
//             readOnly
//           />
        
//           <TextInput
//             label="Engineering Design Fee (4% of ECC)"
//             value={formatCurrency(calculatedValues.engineerCost)}
//             readOnly
//           />
//           <TextInput
//             label="Estimate Architectural Design Fee (2% of ECC)"
//             value={formatCurrency(calculatedValues.designMEPCost)}
//             readOnly
//           />
//           <TextInput
//             label="Total Design Cost"
//             fw={800}
//             variant="unstyled"
//             value={formatCurrency(calculatedValues.totalDesignBuild)}
//             readOnly
//           />
//           </Fieldset> */}
//           <Fieldset legend={fieldLegend(<FaMoneyBills />, "Estimated Miscellaneous and Cash Reserve")}>
//           {/* <TextInput
//             label="Full Budget Design and Build"
//             value={formatCurrency(calculatedValues.fullBudgetDesignBuild)}
//             readOnly
//           /> */}
//           <TextInput
//             label="Permit Fee, Licences Fee, Admisnistration & Insurance"
//             value={formatCurrency(calculatedValues.permitFee)}
//             readOnly
//           />
//           <TextInput
//             label="Contingency Cash Reserve"
//             value={formatCurrency(calculatedValues.contingencyCashReserve)}
//             readOnly
//           />

//           </Fieldset>
//         <TextInput
//           ml={25}
//           label="Total Project Cost"
//           size="xl"
//           fw={800}
//           variant="unstyled"
//           value={"≈ " + formatCurrency(calculatedValues.finalConstructionCost)}
//           readOnly
//         />
//  <Fieldset legend={fieldLegend(<TbUser />, "Enter User Details (optional)")} >
//           <TextInput
    
//             label="Email"
//             placeholder="Enter Email"
//             value={userInput.email}
//             onChange={(event) => setUserInput({ ...userInput, email: event.target.value })}
//           />
//           <TextInput
//             label="Phone Number"  
//             placeholder="Enter Phone Number"
//             value={userInput.phoneNumber}
//             onChange={(event) => setUserInput({ ...userInput, phoneNumber: event.target.value })}
//           />
//           <Flex justify={'flex-end'} pt={10}>          <Button>Submit</Button></Flex>

//         </Fieldset>
//       </Stack>

//     </Stack>
//   );
// }

// export default ConstructionCostForm;