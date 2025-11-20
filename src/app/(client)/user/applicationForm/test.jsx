// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import TextField from '@/components/utils/TextField';
// import { Button, Upload, DatePicker, Radio, Select, Space, message, Collapse } from 'antd';
// import { Image as AntdImage } from 'antd';
// import { IconUpload } from '@tabler/icons-react';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import CustomDropdown from '@/components/utils/CustomDropdown';

// dayjs.extend(customParseFormat);
// const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
// const { Panel } = Collapse;

// const ApplicationForm = ({ config }) => {
//   const [expandedSections, setExpandedSections] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [touchedFields, setTouchedFields] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fieldRefs = useRef({});
//   const accordionRefs = useRef([]);
//   const formRef = useRef(null);

//   // Initialize form data and expanded sections based on config
//   useEffect(() => {
//     if (config) {
//       const initialData = {};
//       const initialExpandedSections = [];
      
//       Object.entries(config.sections).forEach(([sectionKey, section], index) => {
//         if (section.enabled) {
//           initialExpandedSections.push(index);
          
//           Object.entries(section.fields).forEach(([fieldKey, field]) => {
//             if (field.enabled) {
//               initialData[fieldKey] = '';
//             }
//           });
//         }
//       });
      
//       setFormData(initialData);
//       setExpandedSections(initialExpandedSections);
//     }
//   }, [config]);

//   if (!config) {
//     return (
//       <div className="w-full bg-body-color p-6 text-center">
//         <h2 className="text-xl font-medium text-gray-600">No form configuration selected</h2>
//         <p className="text-gray-500 mt-2">Please select or create a form template</p>
//       </div>
//     );
//   }

//   // Rest of your existing ApplicationForm component code...
//   // Keep all your existing handlers (handleChange, handleBlur, etc.)
//   // Modify the form rendering to only show enabled sections and fields

//   const renderSection = (sectionKey, section, index) => {
//     if (!section.enabled) return null;

//     return (
//       <div
//         // ref={(ref) => registerAccordionRef(index, ref)}
//         className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
//         key={sectionKey}
//       >
//         <button
//           type="button"
//           className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(index) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
//         //   onClick={() => toggleSection(index)}
//         >
//           <span className="font-medium text-base md:text-lg">{section.label}</span>
//           <svg
//             className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(index) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(index) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
//           <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(section.fields).map(([fieldKey, field]) => (
//               field.enabled && renderField(fieldKey, field, sectionKey)
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderField = (fieldKey, field, sectionKey) => {
//     // Your existing field rendering logic, but only for enabled fields
//     // Example for text field:
//     return (
//       <div 
//     //   ref={(ref) => registerFieldRef(fieldKey, ref)}
//        key={fieldKey}>
//         <TextField
//           label={fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//           placeholder={`Enter ${fieldKey.replace(/([A-Z])/g, ' $1')}`}
//           name={fieldKey}
//         //   onChange={(value) => handleChange(fieldKey, value)}
//         //   onBlur={() => handleBlur(fieldKey)}
//           value={formData[fieldKey] || ''}
//           error={errors[fieldKey]}
//           required={field.required}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="w-full bg-body-color">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Applicant Registration</h1>
//       <form ref={formRef}
//     //    onSubmit={handleSubmit}
//        >
//         {Object.entries(config.sections).map(([sectionKey, section], index) => 
//           renderSection(sectionKey, section, index)
//         )}

//         <div className="flex flex-col space-y-1 mt-5">
//           <p className='text-primary'>Total Payable Fee: <span>₹ 0.00</span></p>
//           <p className='text-primary'>Summary: <span>Application Fee: </span><span>₹ 0.00</span></p>
//         </div>
//         <div className="mt-6 flex justify-start">
//           <Button
//             className='btn btn-primary'
//             htmlType="submit"
//             size="large"
//             loading={isSubmitting}
//           >
//             Submit Form
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplicationForm;

// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import TextField from '@/components/utils/TextField';
// import { Button, Upload, DatePicker, Radio, Select, Space, message, Collapse } from 'antd';
// import { Image as AntdImage } from 'antd';
// import { IconUpload } from '@tabler/icons-react';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import CustomDropdown from '@/components/utils/CustomDropdown';

// dayjs.extend(customParseFormat);
// const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
// const { Panel } = Collapse;

// const ApplicationForm = ({ config }) => {
//   const [expandedSections, setExpandedSections] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [touchedFields, setTouchedFields] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fieldRefs = useRef({});
//   const accordionRefs = useRef([]);
//   const formRef = useRef(null);

//   // Initialize form data and expanded sections based on config
//   useEffect(() => {
//     if (config) {
//       const initialData = {};
//       const initialExpandedSections = [];
      
//       Object.entries(config.sections).forEach(([sectionKey, section], index) => {
//         if (section.enabled) {
//           initialExpandedSections.push(index);
          
//           Object.entries(section.fields).forEach(([fieldKey, field]) => {
//             if (field.enabled) {
//               // Set default value based on field type
//               initialData[fieldKey] = field.defaultValue || 
//                 (field.type === 'checkbox' ? false : 
//                  field.type === 'radio' ? '' : 
//                  field.type === 'select' ? '' : 
//                  field.type === 'file' ? null : '');
//             }
//           });
//         }
//       });
      
//       setFormData(initialData);
//       setExpandedSections(initialExpandedSections);
//     }
//   }, [config]);

//   const toggleSection = (index) => {
//     setExpandedSections(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const handleChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Validate on change if the field has been touched
//     if (touchedFields[name]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (name) => {
//     if (!touchedFields[name]) {
//       setTouchedFields(prev => ({
//         ...prev,
//         [name]: true
//       }));
//       validateField(name, formData[name]);
//     }
//   };

//   const validateField = (name, value) => {
//     if (!config) return true;
    
//     // Find the field configuration
//     let fieldConfig = null;
//     for (const section of Object.values(config.sections)) {
//       if (section.fields && section.fields[name]) {
//         fieldConfig = section.fields[name];
//         break;
//       }
//     }

//     if (!fieldConfig) return true;

//     // Run validation based on field configuration
//     let error = '';
    
//     if (fieldConfig.required && !value) {
//       error = `${fieldConfig.label || name} is required`;
//     } else if (fieldConfig.validation) {
//       // Custom validation function from config
//       error = fieldConfig.validation(value);
//     } else if (fieldConfig.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       error = 'Invalid email format';
//     } else if (fieldConfig.type === 'tel' && value && !/^[0-9]{10}$/.test(value)) {
//       error = 'Invalid phone number';
//     } else if (fieldConfig.type === 'number' && value && isNaN(value)) {
//       error = 'Must be a number';
//     } else if (fieldConfig.minLength && value && value.length < fieldConfig.minLength) {
//       error = `Must be at least ${fieldConfig.minLength} characters`;
//     } else if (fieldConfig.maxLength && value && value.length > fieldConfig.maxLength) {
//       error = `Must be at most ${fieldConfig.maxLength} characters`;
//     }

//     setErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));

//     return !error;
//   };

//   const validateForm = () => {
//     if (!config) return false;
    
//     let isValid = true;
//     const newErrors = {};

//     // Validate all enabled fields
//     Object.entries(config.sections).forEach(([_, section]) => {
//       if (section.enabled) {
//         Object.entries(section.fields).forEach(([fieldKey, field]) => {
//           if (field.enabled) {
//             const valid = validateField(fieldKey, formData[fieldKey]);
//             if (!valid) isValid = false;
//           }
//         });
//       }
//     });

//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Mark all fields as touched
//     const allFieldsTouched = {};
//     Object.keys(formData).forEach(key => {
//       allFieldsTouched[key] = true;
//     });
//     setTouchedFields(allFieldsTouched);

//     if (validateForm()) {
//       // Form is valid, proceed with submission
//       console.log('Form submitted:', formData);
//       message.success('Form submitted successfully!');
//     } else {
//       message.error('Please fix the errors in the form');
//     }

//     setIsSubmitting(false);
//   };

//   const registerFieldRef = (name, ref) => {
//     if (ref) {
//       fieldRefs.current[name] = ref;
//     }
//   };

//   const registerAccordionRef = (index, ref) => {
//     if (ref) {
//       accordionRefs.current[index] = ref;
//     }
//   };

//   const scrollToError = async (errorField) => {
//     if (!config) return;

//     // Find which section contains the error field
//     let sectionIndex = -1;
//     Object.entries(config.sections).forEach(([_, section], index) => {
//       if (section.enabled && section.fields[errorField]) {
//         sectionIndex = index;
//       }
//     });

//     if (sectionIndex !== -1) {
//       // Open the accordion section if it's not already open
//       if (!expandedSections.includes(sectionIndex)) {
//         setExpandedSections(prev => [...prev, sectionIndex]);
//         await new Promise(resolve => setTimeout(resolve, 300));
//       }

//       // Scroll to the field
//       const fieldRef = fieldRefs.current[errorField];
//       if (fieldRef) {
//         fieldRef.scrollIntoView({
//           behavior: 'smooth',
//           block: 'center'
//         });

//         setTimeout(() => {
//           const focusableElement = fieldRef.querySelector('input, select, textarea') || fieldRef;
//           if (focusableElement) {
//             focusableElement.focus();
//           }
//         }, 100);
//       }
//     }
//   };

//   const renderField = (fieldKey, field, sectionKey) => {
//     if (!field.enabled) return null;

//     const commonProps = {
//       key: fieldKey,
//       label: field.label || fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//       name: fieldKey,
//       value: formData[fieldKey],
//       onChange: (value) => handleChange(fieldKey, value),
//       onBlur: () => handleBlur(fieldKey),
//       error: errors[fieldKey],
//       required: field.required,
//       ref: (ref) => registerFieldRef(fieldKey, ref),
//       placeholder: field.placeholder || `Enter ${field.label || fieldKey.replace(/([A-Z])/g, ' $1')}`,
//       disabled: field.disabled
//     };

//     switch (field.type) {
//       case 'text':
//       case 'email':
//       case 'tel':
//       case 'number':
//       case 'password':
//         return (
//           <TextField
//             {...commonProps}
//             type={field.type}
//             maxLength={field.maxLength}
//             minLength={field.minLength}
//           />
//         );

//       case 'textarea':
//         return (
//           <div className="col-span-2">
//             <TextField
//               {...commonProps}
//               type="textarea"
//               rows={field.rows || 4}
//             />
//           </div>
//         );

//       case 'date':
//         return (
//           <div className="mb-4 form-control">
//             <label className="form-label">
//               {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
//             </label>
//             <DatePicker
//               className={`w-full form-input ${errors[fieldKey] ? 'border-red-500' : ''}`}
//               value={formData[fieldKey] ? dayjs(formData[fieldKey], dateFormat) : null}
//               format={dateFormat}
//               onChange={(date, dateString) => {
//                 handleChange(fieldKey, dateString);
//                 handleBlur(fieldKey);
//               }}
//               status={errors[fieldKey] ? 'error' : ''}
//               placeholder={commonProps.placeholder}
//             />
//             {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
//           </div>
//         );

//       case 'radio':
//         return (
//           <div className="mb-4 form-control">
//             <label className="form-label">
//               {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
//             </label>
//             <div className="flex gap-4 items-center">
//               {field.options.map((option) => (
//                 <label key={option.value} className="form-radio inline-flex items-center">
//                   <input
//                     type="radio"
//                     name={fieldKey}
//                     value={option.value}
//                     checked={formData[fieldKey] === option.value}
//                     onChange={(e) => handleChange(fieldKey, e.target.value)}
//                     className="form-radio-input"
//                     required={field.required}
//                   />
//                   <span className="ml-2 capitalize">{option.label}</span>
//                 </label>
//               ))}
//             </div>
//             {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
//           </div>
//         );

//       case 'select':
//         return (
//           <CustomDropdown
//             {...commonProps}
//             showSearch={field.showSearch}
//             options={field.options}
//           />
//         );

//       case 'file':
//       case 'image':
//         return (
//           <div className="form-control flex flex-col space-y-2">
//             <label className="form-label">
//               {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
//             </label>
//             <Upload
//               beforeUpload={(file) => {
//                 handleChange(fieldKey, file);
//                 handleBlur(fieldKey);
//                 return false;
//               }}
//               onRemove={() => handleChange(fieldKey, null)}
//               maxCount={1}
//               accept={field.type === 'image' ? 'image/*' : field.accept || '*'}
//               fileList={formData[fieldKey] ? [{
//                 uid: '-1',
//                 name: formData[fieldKey].name,
//                 status: 'done',
//                 originFileObj: formData[fieldKey],
//               }] : []}
//               listType={field.type === 'image' ? 'picture-card' : 'text'}
//               onPreview={(file) => {
//                 if (field.type === 'image') {
//                   const imageUrl = URL.createObjectURL(file.originFileObj);
//                   window.open(imageUrl, '_blank');
//                 }
//               }}
//               itemRender={(originNode, file) => (
//                 <div className="ant-upload-list-item-container">
//                   {originNode}
//                 </div>
//               )}
//             >
//               {!formData[fieldKey] && (
//                 <Button icon={<IconUpload />} />
//               )}
//             </Upload>
//             {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
//           </div>
//         );

//       case 'checkbox':
//         return (
//           <div className="form-control">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 name={fieldKey}
//                 checked={formData[fieldKey] || false}
//                 onChange={(e) => handleChange(fieldKey, e.target.checked)}
//                 className="form-checkbox"
//               />
//               <span className="ml-2">{commonProps.label}</span>
//             </label>
//             {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
//           </div>
//         );

//       default:
//         return (
//           <TextField
//             {...commonProps}
//             type="text"
//           />
//         );
//     }
//   };

//   const renderSection = (sectionKey, section, index) => {
//     if (!section.enabled) return null;

//     return (
//       <div
//         ref={(ref) => registerAccordionRef(index, ref)}
//         className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
//         key={sectionKey}
//       >
//         <button
//           type="button"
//           className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(index) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
//           onClick={() => toggleSection(index)}
//         >
//           <span className="font-medium text-base md:text-lg">{section.label || sectionKey}</span>
//           <svg
//             className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(index) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(index) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
//           <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(section.fields).map(([fieldKey, field]) => (
//               renderField(fieldKey, field, sectionKey)
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (!config) {
//     return (
//       <div className="w-full bg-body-color p-6 text-center">
//         <h2 className="text-xl font-medium text-gray-600">No form configuration selected</h2>
//         <p className="text-gray-500 mt-2">Please select or create a form template</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-body-color">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">{config.title || 'Applicant Registration'}</h1>
//       <form ref={formRef} onSubmit={handleSubmit}>
//         {Object.entries(config.sections).map(([sectionKey, section], index) => 
//           renderSection(sectionKey, section, index)
//         )}

//         <div className="flex flex-col space-y-1 mt-5">
//           <p className='text-primary'>Total Payable Fee: <span>₹ 0.00</span></p>
//           <p className='text-primary'>Summary: <span>Application Fee: </span><span>₹ 0.00</span></p>
//         </div>
//         <div className="mt-6 flex justify-start">
//           <Button
//             className='btn btn-primary'
//             htmlType="submit"
//             size="large"
//             loading={isSubmitting}
//           >
//             Submit Form
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplicationForm;

// 'use client';
// import { useState } from 'react';
// import { Button, Checkbox, Collapse, Divider } from 'antd';
// import { IconSettings, IconCheck, IconX } from '@tabler/icons-react';

// const CustomForm = ({ onSave }) => {
//     // Default configuration with all sections and fields
//     const defaultConfig = {
//         sections: {
//             personalInfo: {
//                 enabled: true,
//                 label: 'Student Personal Information',
//                 fields: {
//                     firstName: { enabled: true, required: true },
//                     middleName: { enabled: true, required: false },
//                     lastName: { enabled: true, required: true },
//                     dob: { enabled: true, required: true },
//                     gender: { enabled: true, required: true },
//                     nationality: { enabled: true, required: true },
//                     studentPhoto: { enabled: true, required: false },
//                     studentCategory: { enabled: true, required: false },
//                     religion: { enabled: true, required: false },
//                     bloodGroup: { enabled: true, required: false },
//                     birthPlace: { enabled: true, required: false },
//                     motherTongue: { enabled: true, required: false }
//                 }
//             },
//             communicationInfo: {
//                 enabled: true,
//                 label: 'Student Communication Information',
//                 fields: {
//                     addressLine1: { enabled: true, required: true },
//                     addressLine2: { enabled: true, required: false },
//                     city: { enabled: true, required: true },
//                     state: { enabled: true, required: true },
//                     pinCode: { enabled: true, required: true },
//                     country: { enabled: true, required: true },
//                     phone: { enabled: true, required: false },
//                     mobile: { enabled: true, required: true },
//                     email: { enabled: true, required: true }
//                 }
//             },
//             previousInstitution: {
//                 enabled: true,
//                 label: 'Previous Institution Information',
//                 fields: {
//                     institutionName: { enabled: true, required: true },
//                     qualifyingExamName: { enabled: true, required: true },
//                     examRollNo: { enabled: true, required: true },
//                     finalScore: { enabled: true, required: true }
//                 }
//             },
//             guardianPersonal: {
//                 enabled: true,
//                 label: 'Guardian Personal Information',
//                 fields: {
//                     gpFirstName: { enabled: true, required: true },
//                     gpLastName: { enabled: true, required: true },
//                     gpRelation: { enabled: true, required: true },
//                     gpEducation: { enabled: true, required: false },
//                     gpOccupation: { enabled: true, required: false },
//                     gpIncome: { enabled: true, required: false }
//                 }
//             },
//             guardianContact: {
//                 enabled: true,
//                 label: 'Guardian Contact Details',
//                 fields: {
//                     gpOfAddressLine1: { enabled: true, required: true },
//                     gpOfAddressLine2: { enabled: true, required: false },
//                     gpCity: { enabled: true, required: true },
//                     gpState: { enabled: true, required: true },
//                     gpCountry: { enabled: true, required: true },
//                     gpOfPhone1: { enabled: true, required: false },
//                     gpOfPhone2: { enabled: true, required: false },
//                     gpMobile: { enabled: true, required: true },
//                     gpEmail: { enabled: true, required: true }
//                 }
//             }
//         }
//     };

//     const [config, setConfig] = useState(defaultConfig);

//     const toggleSection = (sectionKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     enabled: !prev.sections[sectionKey].enabled
//                 }
//             }
//         }));
//     };

//     const toggleField = (sectionKey, fieldKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     fields: {
//                         ...prev.sections[sectionKey].fields,
//                         [fieldKey]: {
//                             ...prev.sections[sectionKey].fields[fieldKey],
//                             enabled: !prev.sections[sectionKey].fields[fieldKey].enabled
//                         }
//                     }
//                 }
//             }
//         }));
//     };

//     const toggleFieldRequired = (sectionKey, fieldKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     fields: {
//                         ...prev.sections[sectionKey].fields,
//                         [fieldKey]: {
//                             ...prev.sections[sectionKey].fields[fieldKey],
//                             required: !prev.sections[sectionKey].fields[fieldKey].required
//                         }
//                     }
//                 }
//             }
//         }));
//     };

//     const handleSave = () => {
//         onSave(config);
//     };

//     const handleReset = () => {
//         setConfig(defaultConfig);
//     };

//     // Convert sections to items array for Collapse component
//     const collapseItems = Object.entries(config.sections).map(([sectionKey, section]) => ({
//         key: sectionKey,
//         label: (
//             <div className="flex items-center justify-between">
//                 <span>{section.label}</span>
//                 <Checkbox
//                     className="form-check-input"
//                     checked={section.enabled}
//                     onChange={(e) => {
//                         e.stopPropagation();
//                         toggleSection(sectionKey);
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     Enable Section
//                 </Checkbox>
//             </div>
//         ),
//         children: (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(section.fields).map(([fieldKey, field]) => (
//                     <div key={fieldKey} className="flex items-center justify-between p-2 border rounded">
//                         <span className="capitalize">{fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
//                         <div className="flex items-center gap-4">
//                             <Checkbox
//                                 checked={field.enabled}
//                                 onChange={() => toggleField(sectionKey, fieldKey)}
//                             >
//                                 Include
//                             </Checkbox>
//                             <Checkbox
//                                 checked={field.required}
//                                 onChange={() => toggleFieldRequired(sectionKey, fieldKey)}
//                                 disabled={!field.enabled}
//                             >
//                                 Required
//                             </Checkbox>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }));

//     return (
//         <div className="p-4 bg-body-color rounded-lg shadow">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-primary flex items-center gap-2">
//                     <IconSettings className="text-primary" /> Custom Form Configuration
//                 </h2>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={handleReset}
//                         className='btn btn-secondary'
//                     >
//                         <IconX size={18} />
//                         Reset
//                     </button>
//                     <button
//                         className='btn btn-primary'
//                         onClick={handleSave}
//                     >
//                         <IconCheck size={18} />
//                         Save Configuration
//                     </button>
//                 </div>
//             </div>

//             {/* <Divider orientation="left">Form Sections</Divider> */}

//             <Collapse accordion items={collapseItems} />
//         </div>
//     );
// };

// export default CustomForm;
