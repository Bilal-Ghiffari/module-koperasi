import { warningMsg } from "@/helpers/Notification/toastNotification";
import { Box, CircularProgress } from "@mui/material";
import { getIn } from "formik";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { FiFileText, FiChevronDown, FiX, FiSearch } from "react-icons/fi";
import { Button, FormFeedback, Input, Label, Spinner } from "reactstrap";

export const FormInput = ({
  formik,
  name,
  type = "text",
  placeholder,
  readonly = false,
  autoComplete = "off",
  onlyNumber = false,
  required = false,
  title = "",
  fontSize = "12px",
  ...restProps
}) => {
  const handleInputChange = (event) => {
    let value = event.target.value;

    if (onlyNumber) {
      value = value.replace(/[^0-9]/g, "");
    }

    // Filter out non-numeric characters for 'number' and 'tel' types
    if (type === "number" || type === "tel") {
      value = value.replace(/[^0-9]/g, "");
    }

    // Limit input length for textarea if maxLength is provided
    if (type === "textarea" && restProps.maxLength) {
      value = value.slice(0, restProps.maxLength);
    }

    // Update Formik's value - this will trigger validation automatically
    formik.setFieldValue(name, value);
  };

  const handleBlur = (event) => {
    formik.handleBlur(event);
  };

  // getIn -> untuk mengakses nilai dalam objek, terutama dalam konteks data formulir yang terstruktur dalam bentuk objek bersarang atau array.

  const value = getIn(formik.values, name) || "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  return (
    <div className="mb-3" style={{ fontFamily: "Poppins" }}>
      {title && (
        <Label
          className="m-0 pb-2"
          style={{
            fontSize,
          }}
          htmlFor={name}
        >
          {title} {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        className="form-control form-field-input"
        placeholder={placeholder}
        type={type}
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={value}
        invalid={touched && !!error}
        readOnly={readonly}
        autoComplete={autoComplete}
        style={{
          border: "1px solid #E7E7E7",
          color: !formik.values[name] ? "#B0B0B0" : "#000",
          paddingLeft: "12px",
        }}
        {...restProps}
      />
      {touched && error && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </div>
  );
};

export const FormSelect = ({
  formik,
  name,
  placeholder,
  options = [],
  autoComplete = "off",
  fontSize = "12px",
  readonly = false,
  required = false,
  title = "",
  isCustom = false,
  isUniversitas = false,
  isLoading = false,
  ...restProps
}) => {
  const value = getIn(formik.values, name) || "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  return (
    <div className="mb-3" style={{ fontFamily: "Poppins" }}>
      {title && (
        <Label htmlFor={name} className="m-0 pb-2" style={{ fontSize }}>
          {title} {required && <span className="text-danger">*</span>}{" "}
        </Label>
      )}

      {isLoading ? (
        <div className="d-flex align-items-center" style={{ height: "38px" }}>
          <Spinner size="sm" className="me-2" />
          <span style={{ fontSize }}>Loading options...</span>
        </div>
      ) : (
        <>
          <Input
            id={name}
            name={name}
            type="select"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value}
            invalid={touched && !!error}
            readOnly={readonly}
            autoComplete={autoComplete}
            style={{
              border: "1px solid #E7E7E7",
              color: formik.values[name] === "" ? "#B0B0B0" : "#000",
              boxShadow: "none",
              fontSize,
            }}
            {...restProps}
          >
            <option value="">{`Pilih ${placeholder}`}</option>
            {options.map((option, index) => {
              if (isUniversitas) {
                return (
                  <option
                    key={index}
                    value={option?.id_satuan_pendidikan || option?.value}
                  >
                    {option?.nama_satuan_pendidikan}
                  </option>
                );
              } else if (isCustom) {
                return (
                  <option key={index} value={option?.id || option?.value}>
                    {option?.nama}
                  </option>
                );
              } else {
                return (
                  <option key={index} value={option?.value}>
                    {option?.label}
                  </option>
                );
              }
            })}
          </Input>
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </>
      )}
    </div>
  );
};

// export const SearchableFormSelect = ({
//   formik,
//   name,
//   placeholder,
//   options = [],
//   autoComplete = "off",
//   fontSize = "12px",
//   readonly = false,
//   required = false,
//   title = "",
//   isCustom = false,
//   isUniversitas = false,
//   isLoading = false,
//   maxHeight = "200px",
//   searchPlaceholder = "Cari...",
//   noDataText = "Tidak ada data",
//   debounceMs = 300,
//   ...restProps
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);

//   const dropdownRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const optionsRef = useRef([]);

//   const value = getIn(formik.values, name) || "";
//   console.log("🚀 ~ value:", value);
//   const error = getIn(formik.errors, name);
//   const touched = getIn(formik.touched, name);

//   // Debounced search term
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, debounceMs);

//     return () => clearTimeout(timer);
//   }, [searchTerm, debounceMs]);

//   // Memoized filtered options for performance
//   const filteredOptions = useMemo(() => {
//     if (!debouncedSearchTerm.trim()) return options;

//     return options.filter((option) => {
//       let searchText = "";

//       if (isUniversitas) {
//         searchText = option?.nama_satuan_pendidikan?.toLowerCase() || "";
//       } else if (isCustom) {
//         searchText = option?.nama?.toLowerCase() || "";
//       } else {
//         searchText = option?.label?.toLowerCase() || "";
//       }

//       return searchText.includes(debouncedSearchTerm.toLowerCase().trim());
//     });
//   }, [options, debouncedSearchTerm, isUniversitas, isCustom]);

//   // Get display text for selected value
//   const getDisplayText = useCallback(() => {
//     if (!value) return `Pilih ${placeholder}`;

//     const selectedOption = options.find((option) => {
//       if (isUniversitas) {
//         return (option?.id_satuan_pendidikan || option?.value) === value;
//       } else if (isCustom) {
//         return (option?.id || option?.value) === value;
//       } else {
//         console.log("🚀 ~ selectedOption ~ value:", value);
//         return option?.value === value;
//       }
//     });
//     console.log("🚀 ~ selectedOption ~ selectedOption:", selectedOption);
//     console.log("options", options);

//     if (!selectedOption) return `Pilih ${placeholder}`;

//     if (isUniversitas) {
//       return selectedOption?.nama_satuan_pendidikan || "";
//     } else if (isCustom) {
//       return selectedOption?.nama || "";
//     } else {
//       return selectedOption?.label || "";
//     }
//   }, [value, options, placeholder, isUniversitas, isCustom]);

//   // Handle option selection
//   const handleOptionSelect = useCallback(
//     async (optionValue) => {
//       // Set field value and mark as touched
//       await formik.setFieldValue(name, optionValue);
//       formik.setFieldTouched(name, true);

//       // Clear any existing error for this field
//       if (formik.errors[name]) {
//         formik.setFieldError(name, undefined);
//       }

//       // Trigger validation after selection
//       setTimeout(() => {
//         formik.validateField(name);
//       }, 0);

//       setIsOpen(false);
//       setSearchTerm("");
//       setHighlightedIndex(-1);
//     },
//     [formik, name]
//   );

//   // Handle dropdown toggle
//   const handleToggleDropdown = useCallback(() => {
//     if (readonly || isLoading) return;

//     setIsOpen((prev) => {
//       const newState = !prev;
//       if (newState) {
//         // Opening dropdown - focus search input after state update
//         setTimeout(() => {
//           searchInputRef.current?.focus();
//         }, 0);
//       } else {
//         // Closing dropdown - validate field if it was touched
//         if (formik.touched[name]) {
//           setTimeout(() => {
//             formik.validateField(name);
//           }, 0);
//         }
//       }
//       return newState;
//     });
//   }, [readonly, isLoading, formik, name]);

//   // Handle clear selection
//   const handleClear = useCallback(
//     async (e) => {
//       e.stopPropagation();
//       await formik.setFieldValue(name, "");

//       formik.setFieldTouched(name, true);

//       // Clear any existing error and trigger validation
//       if (formik.errors[name]) {
//         formik.setFieldError(name, undefined);
//       }

//       setTimeout(() => {
//         formik.validateField(name);
//       }, 0);
//     },
//     [formik, name]
//   );

//   // Handle keyboard navigation
//   const handleKeyDown = useCallback(
//     (e) => {
//       if (!isOpen) return;

//       switch (e.key) {
//         case "ArrowDown":
//           e.preventDefault();
//           setHighlightedIndex((prev) =>
//             prev < filteredOptions.length - 1 ? prev + 1 : 0
//           );
//           break;
//         case "ArrowUp":
//           e.preventDefault();
//           setHighlightedIndex((prev) =>
//             prev > 0 ? prev - 1 : filteredOptions.length - 1
//           );
//           break;
//         case "Enter":
//           e.preventDefault();
//           if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
//             const option = filteredOptions[highlightedIndex];
//             const optionValue = isUniversitas
//               ? option?.id_satuan_pendidikan || option?.value
//               : isCustom
//               ? option?.id || option?.value
//               : option?.value;
//             handleOptionSelect(optionValue);
//           }
//           break;
//         case "Escape":
//           setIsOpen(false);
//           setSearchTerm("");
//           setHighlightedIndex(-1);
//           break;
//       }
//     },
//     [
//       isOpen,
//       highlightedIndex,
//       filteredOptions,
//       handleOptionSelect,
//       isUniversitas,
//       isCustom,
//     ]
//   );

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSearchTerm("");
//         setHighlightedIndex(-1);

//         // Validate field when clicking outside if field was touched
//         if (formik.touched[name]) {
//           setTimeout(() => {
//             formik.validateField(name);
//           }, 0);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [formik, name]);

//   // Reset highlighted index when filtered options change
//   useEffect(() => {
//     setHighlightedIndex(-1);
//   }, [filteredOptions]);

//   // Scroll highlighted option into view
//   useEffect(() => {
//     if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
//       optionsRef.current[highlightedIndex].scrollIntoView({
//         block: "nearest",
//         behavior: "smooth",
//       });
//     }
//   }, [highlightedIndex]);

//   return (
//     <div className="mb-3" style={{ fontFamily: "Poppins" }}>
//       {title && (
//         <Label htmlFor={name} className="m-0 pb-2" style={{ fontSize }}>
//           {title} {required && <span className="text-danger">*</span>}
//         </Label>
//       )}

//       <div className="position-relative" ref={dropdownRef}>
//         {isLoading ? (
//           <div className="d-flex align-items-center" style={{ height: "38px" }}>
//             <Spinner size="sm" className="me-2" />
//             <span style={{ fontSize }}>Loading options...</span>
//           </div>
//         ) : (
//           <>
//             {/* Main Select Display */}
//             <div
//               className={`form-control d-flex align-items-center justify-content-between ${
//                 touched && error ? "is-invalid" : ""
//               }`}
//               style={{
//                 border: "1px solid #E7E7E7",
//                 color: value === "" ? "#B0B0B0" : "#000",
//                 boxShadow: "none",
//                 fontSize,
//                 cursor: readonly ? "default" : "pointer",
//                 backgroundColor: readonly ? "#f8f9fa" : "#fff",
//                 minHeight: "38px",
//               }}
//               onClick={handleToggleDropdown}
//               onKeyDown={handleKeyDown}
//               tabIndex={readonly ? -1 : 0}
//               role="combobox"
//               aria-expanded={isOpen}
//               aria-haspopup="listbox"
//               aria-invalid={touched && !!error}
//             >
//               <span className="flex-grow-1 text-truncate">
//                 {getDisplayText()}
//               </span>

//               <div className="d-flex align-items-center">
//                 {value && !readonly && (
//                   <FiX
//                     size={16}
//                     className="me-2 text-muted"
//                     style={{ cursor: "pointer" }}
//                     onMouseDown={(e) => e.preventDefault()}
//                     onClick={handleClear}
//                     title="Clear selection"
//                   />
//                 )}
//                 <FiChevronDown
//                   size={16}
//                   className={`text-muted transition-transform ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                   style={{
//                     transition: "transform 0.2s ease",
//                     transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Dropdown Options */}
//             {isOpen && (
//               <div
//                 className="position-absolute w-100 bg-white border rounded shadow-lg"
//                 style={{
//                   top: "100%",
//                   left: 0,
//                   zIndex: 1050,
//                   maxHeight,
//                   marginTop: "2px",
//                 }}
//               >
//                 {/* Search Input */}
//                 <div className="p-2 border-bottom">
//                   <div className="position-relative">
//                     <FiSearch
//                       size={16}
//                       className="position-absolute text-muted"
//                       style={{
//                         left: "8px",
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                       }}
//                     />
//                     <Input
//                       ref={searchInputRef}
//                       type="text"
//                       placeholder={searchPlaceholder}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="ps-4"
//                       style={{
//                         fontSize: fontSize,
//                         border: "1px solid #dee2e6",
//                         paddingLeft: "32px",
//                       }}
//                       autoComplete="off"
//                     />
//                   </div>
//                 </div>

//                 {/* Options List */}
//                 <div
//                   className="overflow-auto"
//                   style={{ maxHeight: `calc(${maxHeight} - 60px)` }}
//                 >
//                   {filteredOptions.length === 0 ? (
//                     <div
//                       className="px-3 py-2 text-muted text-center"
//                       style={{ fontSize }}
//                     >
//                       {noDataText}
//                     </div>
//                   ) : (
//                     filteredOptions.map((option, index) => {
//                       const optionValue = isUniversitas
//                         ? option?.id_satuan_pendidikan || option?.value
//                         : isCustom
//                         ? option?.id || option?.value
//                         : option?.value;

//                       const optionLabel = isUniversitas
//                         ? option?.nama_satuan_pendidikan
//                         : isCustom
//                         ? option?.nama
//                         : option?.label;

//                       const isSelected = optionValue === value;
//                       const isHighlighted = index === highlightedIndex;

//                       return (
//                         <div
//                           key={`${optionValue}-${index}`}
//                           ref={(el) => (optionsRef.current[index] = el)}
//                           className={`px-3 py-2 cursor-pointer ${
//                             isSelected
//                               ? "bg-primary text-white"
//                               : isHighlighted
//                               ? "bg-light"
//                               : ""
//                           }`}
//                           style={{
//                             fontSize,
//                             cursor: "pointer",
//                             transition: "background-color 0.15s ease",
//                           }}
//                           onClick={() => handleOptionSelect(optionValue)}
//                           role="option"
//                           aria-selected={isSelected}
//                         >
//                           {optionLabel}
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Error Message */}
//             {touched && error && <FormFeedback>{error}</FormFeedback>}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

export const SearchableFormSelect = ({
  formik,
  name,
  placeholder,
  options = [],
  autoComplete = "off",
  fontSize = "12px",
  readonly = false,
  required = false,
  title = "",
  isCustom = false,
  isUniversitas = false,
  isLoading = false,
  maxHeight = "200px",
  searchPlaceholder = "Cari...",
  noDataText = "Tidak ada data",
  debounceMs = 300,
  multiple = false, // New prop for multiple selection
  maxSelectedDisplay = 3, // Maximum number of selected items to display before showing count
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsRef = useRef([]);

  const value = getIn(formik.values, name) || (multiple ? [] : "");
  console.log("🚀 ~ value:", value);
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Memoized filtered options for performance
  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return options;

    return options.filter((option) => {
      let searchText = "";

      if (isUniversitas) {
        searchText = option?.nama_satuan_pendidikan?.toLowerCase() || "";
      } else if (isCustom) {
        searchText = option?.nama?.toLowerCase() || "";
      } else {
        searchText = option?.label?.toLowerCase() || "";
      }

      return searchText.includes(debouncedSearchTerm.toLowerCase().trim());
    });
  }, [options, debouncedSearchTerm, isUniversitas, isCustom]);

  // Get selected options for multiple select
  const getSelectedOptions = useCallback(() => {
    if (!multiple || !Array.isArray(value)) return [];

    return value
      .map((val) => {
        return options.find((option) => {
          if (isUniversitas) {
            return (option?.id_satuan_pendidikan || option?.value) === val;
          } else if (isCustom) {
            return (option?.id || option?.value) === val;
          } else {
            return option?.value === val;
          }
        });
      })
      .filter(Boolean);
  }, [value, options, multiple, isUniversitas, isCustom]);

  // Get display text for selected value(s)
  const getDisplayText = useCallback(() => {
    if (multiple) {
      const selectedOptions = getSelectedOptions();
      if (selectedOptions.length === 0) return `Pilih ${placeholder}`;

      return selectedOptions.map((option) => {
        if (isUniversitas) {
          return option?.nama_satuan_pendidikan || "";
        } else if (isCustom) {
          return option?.nama || "";
        } else {
          return option?.label || "";
        }
      });
    } else {
      if (!value) return `Pilih ${placeholder}`;

      const selectedOption = options.find((option) => {
        if (isUniversitas) {
          return (option?.id_satuan_pendidikan || option?.value) === value;
        } else if (isCustom) {
          return (option?.id || option?.value) === value;
        } else {
          return option?.value === value;
        }
      });

      if (!selectedOption) return `Pilih ${placeholder}`;

      if (isUniversitas) {
        return selectedOption?.nama_satuan_pendidikan || "";
      } else if (isCustom) {
        return selectedOption?.nama || "";
      } else {
        return selectedOption?.label || "";
      }
    }
  }, [
    value,
    options,
    placeholder,
    isUniversitas,
    isCustom,
    multiple,
    getSelectedOptions,
  ]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    async (optionValue) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        let newValues;

        if (currentValues.includes(optionValue)) {
          // Remove if already selected
          newValues = currentValues.filter((val) => val !== optionValue);
        } else {
          // Add if not selected
          newValues = [...currentValues, optionValue];
        }

        await formik.setFieldValue(name, newValues);
      } else {
        await formik.setFieldValue(name, optionValue);
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }

      formik.setFieldTouched(name, true);

      // Clear any existing error for this field
      if (formik.errors[name]) {
        formik.setFieldError(name, undefined);
      }

      // Trigger validation after selection
      setTimeout(() => {
        formik.validateField(name);
      }, 0);
    },
    [formik, name, multiple, value]
  );

  // Handle removing a selected item (for multiple select)
  const handleRemoveItem = useCallback(
    async (e, itemValue) => {
      e.stopPropagation();
      if (!multiple) return;

      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.filter((val) => val !== itemValue);

      await formik.setFieldValue(name, newValues);
      formik.setFieldTouched(name, true);

      if (formik.errors[name]) {
        formik.setFieldError(name, undefined);
      }

      setTimeout(() => {
        formik.validateField(name);
      }, 0);
    },
    [formik, name, multiple, value]
  );

  // Handle dropdown toggle
  const handleToggleDropdown = useCallback(() => {
    if (readonly || isLoading) return;

    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Opening dropdown - focus search input after state update
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      } else {
        // Closing dropdown - validate field if it was touched
        if (formik.touched[name]) {
          setTimeout(() => {
            formik.validateField(name);
          }, 0);
        }
      }
      return newState;
    });
  }, [readonly, isLoading, formik, name]);

  // Handle clear selection
  const handleClear = useCallback(
    async (e) => {
      e.stopPropagation();
      await formik.setFieldValue(name, multiple ? [] : "");

      formik.setFieldTouched(name, true);

      // Clear any existing error and trigger validation
      if (formik.errors[name]) {
        formik.setFieldError(name, undefined);
      }

      setTimeout(() => {
        formik.validateField(name);
      }, 0);
    },
    [formik, name, multiple]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            const option = filteredOptions[highlightedIndex];
            const optionValue = isUniversitas
              ? option?.id_satuan_pendidikan || option?.value
              : isCustom
              ? option?.id || option?.value
              : option?.value;
            handleOptionSelect(optionValue);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          setHighlightedIndex(-1);
          break;
      }
    },
    [
      isOpen,
      highlightedIndex,
      filteredOptions,
      handleOptionSelect,
      isUniversitas,
      isCustom,
    ]
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);

        // Validate field when clicking outside if field was touched
        if (formik.touched[name]) {
          setTimeout(() => {
            formik.validateField(name);
          }, 0);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [formik, name]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  // Render selected tags for multiple select
  const renderSelectedTags = () => {
    if (!multiple) return null;

    const selectedOptions = getSelectedOptions();
    if (selectedOptions.length === 0) return null;

    const displayOptions = selectedOptions.slice(0, maxSelectedDisplay);
    const remainingCount = selectedOptions.length - maxSelectedDisplay;

    return (
      <div className="d-flex flex-wrap gap-1 mb-2">
        {displayOptions.map((option, index) => {
          const optionValue = isUniversitas
            ? option?.id_satuan_pendidikan || option?.value
            : isCustom
            ? option?.id || option?.value
            : option?.value;

          const optionLabel = isUniversitas
            ? option?.nama_satuan_pendidikan
            : isCustom
            ? option?.nama
            : option?.label;

          return (
            <span
              key={optionValue}
              className="badge bg-light text-dark d-flex align-items-center"
              style={{
                fontSize: "11px",
                padding: "4px 8px",
                border: "1px solid #dee2e6",
                borderRadius: "16px",
              }}
            >
              <span className="me-1">{optionLabel}</span>
              {!readonly && (
                <FiX
                  size={12}
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleRemoveItem(e, optionValue)}
                />
              )}
            </span>
          );
        })}
        {remainingCount > 0 && (
          <span
            className="badge bg-secondary text-white"
            style={{
              fontSize: "11px",
              padding: "4px 8px",
              borderRadius: "16px",
            }}
          >
            +{remainingCount} lainnya
          </span>
        )}
      </div>
    );
  };

  const hasSelectedValues = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== "";

  return (
    <div className="mb-3" style={{ fontFamily: "Poppins" }}>
      {title && (
        <Label htmlFor={name} className="m-0 pb-2" style={{ fontSize }}>
          {title} {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <div className="position-relative" ref={dropdownRef}>
        {isLoading ? (
          <div className="d-flex align-items-center" style={{ height: "38px" }}>
            <Spinner size="sm" className="me-2" />
            <span style={{ fontSize }}>Loading options...</span>
          </div>
        ) : (
          <>
            {/* Selected Tags (for multiple select) */}
            {renderSelectedTags()}

            {/* Main Select Display */}
            <div
              className={`form-control d-flex align-items-center justify-content-between ${
                touched && error ? "is-invalid" : ""
              }`}
              style={{
                border: "1px solid #E7E7E7",
                color: !hasSelectedValues ? "#B0B0B0" : "#000",
                boxShadow: "none",
                fontSize,
                cursor: readonly ? "default" : "pointer",
                backgroundColor: readonly ? "#f8f9fa" : "#fff",
                minHeight: "38px",
              }}
              onClick={handleToggleDropdown}
              onKeyDown={handleKeyDown}
              tabIndex={readonly ? -1 : 0}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-invalid={touched && !!error}
            >
              <span className="flex-grow-1 text-truncate">
                {multiple && hasSelectedValues
                  ? `${Array.isArray(value) ? value.length : 0} item dipilih`
                  : getDisplayText()}
              </span>

              <div className="d-flex align-items-center">
                {hasSelectedValues && !readonly && (
                  <FiX
                    size={16}
                    className="me-2 text-muted"
                    style={{ cursor: "pointer" }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClear}
                    title="Clear selection"
                  />
                )}
                <FiChevronDown
                  size={16}
                  className={`text-muted transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
              <div
                className="position-absolute w-100 bg-white border rounded shadow-lg"
                style={{
                  top: "100%",
                  left: 0,
                  zIndex: 1050,
                  maxHeight,
                  marginTop: "2px",
                }}
              >
                {/* Search Input */}
                <div className="p-2 border-bottom">
                  <div className="position-relative">
                    <FiSearch
                      size={16}
                      className="position-absolute text-muted"
                      style={{
                        left: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="ps-4"
                      style={{
                        fontSize: fontSize,
                        border: "1px solid #dee2e6",
                        paddingLeft: "32px",
                      }}
                      autoComplete="off"
                      {...restProps}
                    />
                  </div>
                </div>

                {/* Options List */}
                <div
                  className="overflow-auto"
                  style={{ maxHeight: `calc(${maxHeight} - 60px)` }}
                >
                  {filteredOptions.length === 0 ? (
                    <div
                      className="px-3 py-2 text-muted text-center"
                      style={{ fontSize }}
                    >
                      {noDataText}
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => {
                      const optionValue = isUniversitas
                        ? option?.id_satuan_pendidikan || option?.value
                        : isCustom
                        ? option?.id || option?.value
                        : option?.value;

                      const optionLabel = isUniversitas
                        ? option?.nama_satuan_pendidikan
                        : isCustom
                        ? option?.nama
                        : option?.label;

                      const isSelected = multiple
                        ? Array.isArray(value) && value.includes(optionValue)
                        : optionValue === value;
                      const isHighlighted = index === highlightedIndex;

                      return (
                        <div
                          key={`${optionValue}-${index}`}
                          ref={(el) => (optionsRef.current[index] = el)}
                          className={`px-3 py-2 cursor-pointer d-flex align-items-center ${
                            isSelected
                              ? "bg-primary text-white"
                              : isHighlighted
                              ? "bg-light"
                              : ""
                          }`}
                          style={{
                            fontSize,
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                          }}
                          onClick={() => handleOptionSelect(optionValue)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {multiple && (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // Handled by onClick
                              className="me-2"
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                          <span className="flex-grow-1">{optionLabel}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {touched && error && <FormFeedback>{error}</FormFeedback>}
          </>
        )}
      </div>
    </div>
  );
};
export const FormAutocomplete = ({
  formik,
  name,
  placeholder,
  options = [],
  isMulti = false,
  readonly = false,
  required = false,
  title = "",
  ...restProps
}) => {
  const selectedValue = isMulti
    ? options.filter((option) => formik.values[name]?.includes(option.value))
    : options.find((option) => option.value === formik.values[name]);

  const handleSelectChange = (selectedOption) => {
    if (isMulti) {
      formik.setFieldValue(
        name,
        selectedOption ? selectedOption.map((option) => option.value) : []
      );
    } else {
      formik.setFieldValue(name, selectedOption ? selectedOption.value : "");
    }
    formik.setFieldTouched(name, true);
  };

  const handleBlur = () => {
    formik.setFieldTouched(name, true);
    formik.handleBlur(name);
  };

  const isInvalid = formik.touched[name] && !!formik.errors[name];

  return (
    <div className="mb-3">
      {placeholder && (
        <Label htmlFor={name}>
          {title} {required && <span className="text-danger">*</span>}{" "}
        </Label>
      )}
      <Select
        id={name}
        name={name}
        options={options}
        value={selectedValue}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        isMulti={isMulti}
        placeholder={`Pilih ${placeholder}`}
        isDisabled={readonly}
        classNamePrefix="react-select"
        className={isInvalid ? "is-invalid" : ""}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: isInvalid ? "#dc3545" : "#E7E7E7",
            "&:hover": {
              borderColor: isInvalid ? "#dc3545" : "#E7E7E7",
            },
            boxShadow:
              state.isFocused && isInvalid
                ? "0 0 0 0.25rem rgba(220,53,69,.25)"
                : state.isFocused
                ? "0 0 0 0.25rem rgba(13,110,253,.25)"
                : provided.boxShadow,
          }),
        }}
        {...restProps}
      />
      {formik.touched[name] && formik.errors[name] && (
        <FormFeedback className="d-block">{formik.errors[name]}</FormFeedback>
      )}
    </div>
  );
};

export const FormUploadFile = ({
  formik,
  name,
  label,
  acceptedFileTypes = ["application/pdf"],
  maxFileSizeMB = 1,
  required = false,
  ...restProps
}) => {
  const fileInputRef = useRef(null);

  // Pakai getIn untuk nested/dynamic field
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const isInvalid = touched && !!error;
  const fileValue = getIn(formik.values, name);
  const currentFileName = fileValue instanceof File ? fileValue.name : "";

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldTouched(name, true);

    if (file) {
      const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

      if (!acceptedFileTypes.includes(file.type)) {
        const errorMessage = `Tipe file tidak valid. Harap unggah ${acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(", ")}.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        warningMsg && warningMsg(errorMessage);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMessage = `Ukuran file tidak boleh lebih dari ${maxFileSizeMB}MB.`;
        formik.setFieldError(name, errorMessage);
        formik.setFieldValue(name, null);
        warningMsg && warningMsg(errorMessage);
        return;
      }

      formik.setFieldValue(name, file);
      formik.setFieldError(name, undefined); // Clear previous errors
    } else {
      formik.setFieldValue(name, null);
      formik.setFieldError(name, undefined);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-3">
      <Label style={{ fontSize: "12px", fontWeight: 500 }} htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}{" "}
      </Label>
      <div className="d-flex align-items-center">
        <Box
          sx={{ border: "1px solid #E7E7E7", borderRadius: 2, width: "100%" }}
        >
          <Input
            id={name}
            name={name}
            type="file"
            className="form-control form-field-input"
            onChange={handleFileChange}
            onBlur={() => formik.setFieldTouched(name, true)}
            innerRef={fileInputRef}
            style={{ display: "none" }}
            invalid={isInvalid}
            accept={acceptedFileTypes.join(",")}
            {...restProps}
          />
          <div
            onClick={handleButtonClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleButtonClick();
              }
            }}
            style={{
              minWidth: "100%",
              cursor: "pointer",
            }}
            className="d-flex align-items-center"
          >
            <Button
              style={{
                backgroundColor: "#041662",
                pointerEvents: "none",
              }}
              className="me-2 py-2"
            >
              <FiFileText size={19} />
            </Button>
            <span
              style={{
                color: currentFileName ? "#041662" : "#B0B0B0",
                fontSize: "14px",
                lineHeight: "22px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentFileName ||
                "Unggah dokumen dengan klik untuk memilih file"}
            </span>
          </div>
        </Box>
      </div>
      <span
        style={{
          fontSize: "10px",
          fontWeight: 400,
          lineHeight: "16px",
          color: "#6D6D6D",
        }}
      >
        * File berformat{" "}
        {acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(" atau ")}{" "}
        dan tidak lebih dari {maxFileSizeMB}MB
      </span>
      {isInvalid && (
        <FormFeedback
          type="invalid"
          className="d-block"
          style={{ fontSize: "10px" }}
        >
          {error}
        </FormFeedback>
      )}
    </div>
  );
};

export const AutoUploadFormFile = ({
  formik,
  name,
  label,
  acceptedFileTypes = ["application/pdf"],
  maxFileSizeMB = 1,
  required = false,
  onAutoUpload,
  uploadState = { loading: false, uploaded: false },
  ...restProps
}) => {
  const fileInputRef = useRef(null);

  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const isInvalid = touched && !!error;
  const fileValue = getIn(formik.values, name);
  const currentFileName = fileValue instanceof File ? fileValue.name : "";

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldTouched(name, true);

    if (!file) {
      formik.setFieldValue(name, null);
      return;
    }

    const MAX_FILE_SIZE_BYTES = maxFileSizeMB * 1024 * 1024;

    // Validasi tipe file
    if (!acceptedFileTypes.includes(file.type)) {
      const errorMessage = `Tipe file tidak valid. Harap unggah ${acceptedFileTypes
        .map((type) => type.split("/")[1].toUpperCase())
        .join(", ")}.`;
      formik.setFieldError(name, errorMessage);
      formik.setFieldValue(name, null);
      warningMsg && warningMsg(errorMessage);
      return;
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const errorMessage = `Ukuran file tidak boleh lebih dari ${maxFileSizeMB}MB.`;
      formik.setFieldError(name, errorMessage);
      formik.setFieldValue(name, null);
      warningMsg && warningMsg(errorMessage);
      return;
    }

    // Set file ke formik
    formik.setFieldValue(name, file);
    formik.setFieldError(name, undefined);

    // Auto upload jika function tersedia
    if (onAutoUpload) {
      try {
        await onAutoUpload(file, name);
      } catch (error) {
        // Error handling sudah dilakukan di onAutoUpload
        console.error("Auto upload failed:", error);
      }
    }
  };

  const handleButtonClick = () => {
    if (!uploadState.loading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-3">
      <Label style={{ fontSize: "12px", fontWeight: 500 }} htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <div className="d-flex align-items-center">
        <Box
          sx={{
            border: "1px solid #E7E7E7",
            borderRadius: 2,
            width: "100%",
            opacity: uploadState.loading ? 0.7 : 1,
          }}
        >
          <Input
            id={name}
            name={name}
            type="file"
            className="form-control form-field-input"
            onChange={handleFileChange}
            onBlur={() => formik.setFieldTouched(name, true)}
            innerRef={fileInputRef}
            style={{ display: "none" }}
            invalid={isInvalid}
            accept={acceptedFileTypes.join(",")}
            disabled={uploadState.loading}
            {...restProps}
          />

          <div
            onClick={handleButtonClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleButtonClick();
              }
            }}
            style={{
              minWidth: "100%",
              cursor: uploadState.loading ? "not-allowed" : "pointer",
            }}
            className="d-flex align-items-center"
          >
            <Button
              style={{
                backgroundColor: "#041662",
                pointerEvents: "none",
              }}
              className="me-2 py-2"
              disabled={uploadState.loading}
            >
              {uploadState.loading ? (
                <CircularProgress size={19} color="inherit" />
              ) : (
                <FiFileText size={19} />
              )}
            </Button>

            <span
              style={{
                color: currentFileName ? "#041662" : "#B0B0B0",
                fontSize: "14px",
                lineHeight: "22px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {uploadState.loading
                ? "Uploading file..."
                : currentFileName ||
                  "Unggah dokumen dengan klik untuk memilih file"}
            </span>
          </div>
        </Box>
      </div>

      <span
        style={{
          fontSize: "10px",
          fontWeight: 400,
          lineHeight: "16px",
          color: "#6D6D6D",
        }}
      >
        * File berformat{" "}
        {acceptedFileTypes
          .map((type) => type.split("/")[1].toUpperCase())
          .join(" atau ")}{" "}
        dan tidak lebih dari {maxFileSizeMB}MB
      </span>

      {/* Upload status indicator */}
      {uploadState.loading && (
        <div style={{ fontSize: "10px", color: "#1976d2", marginTop: "4px" }}>
          📤 Uploading file...
        </div>
      )}

      {uploadState.uploaded && (
        <div style={{ fontSize: "10px", color: "#2e7d32", marginTop: "4px" }}>
          ✅ File berhasil diupload
        </div>
      )}

      {isInvalid && (
        <FormFeedback
          type="invalid"
          className="d-block"
          style={{ fontSize: "10px" }}
        >
          {error}
        </FormFeedback>
      )}
    </div>
  );
};
