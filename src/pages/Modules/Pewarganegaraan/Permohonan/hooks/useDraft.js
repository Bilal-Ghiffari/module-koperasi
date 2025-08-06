import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { validationSchemas } from "../schemas";
import { createDraftSchema, getFilledValues } from "../utils/formHelper";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { successMsg } from "@/helpers/Notification/toastNotification";

export const useDraft = (
  currentPermohonanId,
  postPermohonan,
  patchPermohonan,
  processPayloadBasedOnTempatLahir
) => {
  const toastifyService = new ToastifyService();

  const saveDraft = useCallback(
    async (data) => {
      const shouldSave = await toastifyService.customConfirmation(
        "Apakah anda yakin akan menyimpan data ke draft?"
      );

      if (shouldSave) {
        const payload = processPayloadBasedOnTempatLahir(data);
        console.log("Draft values for current step (processed):", payload);

        try {
          let response;

          if (!currentPermohonanId) {
            response = await postPermohonan(payload);
            if (response && response.message === "Success") {
              successMsg("Berhasil menyimpan ke draft");
            }
          } else {
            response = await patchPermohonan(payload);
            if (response && response.message === "Success") {
              successMsg("Berhasil memperbarui draft");
            }
          }

          return response;
        } catch (error) {
          console.error("Error saving draft:", error);
          toastifyService.customWarningMsg("Gagal menyimpan draft");
          throw error;
        }
      }

      return null;
    },
    [
      currentPermohonanId,
      postPermohonan,
      patchPermohonan,
      processPayloadBasedOnTempatLahir,
      toastifyService,
    ]
  );

  const handleDraft = useCallback(
    async (activeStep, formik, setStepErrors) => {
      const currentStepFields = STEP_FIELDS[activeStep];

      // Mark current step fields as touched
      const newTouched = { ...formik.touched };
      currentStepFields.forEach((field) => {
        newTouched[field] = true;
      });
      formik.setTouched(newTouched);

      // Get current step values
      const rawCurrentStepValues = currentStepFields.reduce((acc, field) => {
        acc[field] = formik.values[field];
        return acc;
      }, {});

      // Check if there's any data to save
      if (
        Object.keys(getFilledValues(rawCurrentStepValues, currentStepFields))
          .length === 0
      ) {
        toastifyService.customWarningMsg(
          "Tidak ada data yang perlu disimpan pada langkah ini. Harap isi form jika ingin menyimpan ke draft."
        );
        return;
      }

      const currentSchema = validationSchemas[activeStep];
      let hasFormatErrors = false;

      try {
        if (currentSchema) {
          const draftSchema = createDraftSchema(currentSchema);
          await draftSchema.validate(rawCurrentStepValues, {
            abortEarly: false,
          });
        }

        // Clear errors if validation passes
        const clearedErrors = { ...formik.errors };
        currentStepFields.forEach((field) => {
          delete clearedErrors[field];
        });
        formik.setErrors(clearedErrors);

        setStepErrors((prev) => {
          const newErrors = { ...prev };
          if (newErrors[activeStep]) {
            currentStepFields.forEach(
              (field) => delete newErrors[activeStep][field]
            );
            if (Object.keys(newErrors[activeStep]).length === 0) {
              delete newErrors[activeStep];
            }
          }
          return newErrors;
        });

        // ✅ Await the saveDraft and handle the result properly
        const draftResult = await saveDraft(
          getFilledValues(formik.values, currentStepFields)
        );

        if (draftResult) {
          console.log("✅ Draft saved successfully:", draftResult);
        } else {
          console.log("ℹ️ User cancelled draft save");
        }
      } catch (error) {
        const fieldErrors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            if (
              currentStepFields.includes(err.path) &&
              rawCurrentStepValues[err.path] !== undefined &&
              rawCurrentStepValues[err.path] !== null &&
              rawCurrentStepValues[err.path] !== ""
            ) {
              fieldErrors[err.path] = err.message;
              hasFormatErrors = true;
            }
          });
        }

        if (hasFormatErrors) {
          formik.setErrors({ ...formik.errors, ...fieldErrors });
          setStepErrors((prev) => ({ ...prev, [activeStep]: fieldErrors }));
          toastifyService.customWarningMsg(
            "Beberapa field yang diisi memiliki format yang tidak valid. Mohon periksa kembali."
          );
        } else {
          console.warn(
            "Unexpected validation error, saving draft anyway:",
            error
          );

          // ✅ Handle the fallback save properly
          try {
            const fallbackResult = await saveDraft(
              getFilledValues(formik.values, currentStepFields)
            );
            if (fallbackResult) {
              console.log("✅ Fallback draft save successful:", fallbackResult);
            }
          } catch (fallbackError) {
            console.error("❌ Fallback draft save failed:", fallbackError);
          }
        }
      }
    },
    [saveDraft, toastifyService]
  );

  return {
    saveDraft,
    handleDraft,
  };
};
