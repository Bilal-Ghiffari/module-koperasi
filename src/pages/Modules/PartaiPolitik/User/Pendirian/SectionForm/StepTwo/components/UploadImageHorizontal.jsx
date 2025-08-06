import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { CloudUpload, Close, Add } from "@mui/icons-material";
import { Label } from "reactstrap";
import { ClassNames } from "@emotion/react";

const UploadImageHorizontal = ({ formik, name, title }) => {
  console.log("🚀 ~ UploadImageHorizontal ~ fieldName:", ClassNames);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("🚀 ~ UploadImageHorizontal ~ selectedImage:", selectedImage);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage({
            file: file,
            preview: e.target.result,
            name: file.name,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
        formik.setFieldValue(name, file, true);
      } else {
        alert("File size must be less than 5MB");
      }
    } else {
      alert("Please select a valid image file (JPG/JPEG/PNG)");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <section className="mt-4">
      <Label className="m-0 pb-2" htmlFor="file_lambang_partai">
        {title}
        <span className="text-danger">*</span>
      </Label>

      <Box
        sx={{
          border: "2px dashed #ddd",
          borderRadius: "12px",
          backgroundColor: isDragOver ? "#f8f9fa" : "#f5f5f5",
          borderColor: isDragOver ? "#007bff" : "#ddd",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#f8f9fa",
            borderColor: "#007bff",
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png"
          style={{ display: "none" }}
        />

        {selectedImage ? (
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
            <img
              src={selectedImage.preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {selectedImage.name} ({formatFileSize(selectedImage.size)})
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                backgroundColor: "white",
              }}
            >
              <Add sx={{ fontSize: "40px", color: "#999" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "#007bff",
                fontWeight: 600,
                mb: 1,
                textAlign: "center",
              }}
            >
              Pilih Foto
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6c757d",
                textAlign: "center",
                px: 2,
              }}
            >
              Drag & drop file gambar di sini atau klik untuk memilih
            </Typography>
          </>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: "#6c757d",
          mt: 2,
          display: "block",
          textAlign: "center",
        }}
      >
        *File harus berformat JPG/JPEG/PNG dan berukuran tidak lebih dari 5MB
      </Typography>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="outlined"
          startIcon={<CloudUpload />}
          onClick={handleButtonClick}
          sx={{
            borderColor: "#007bff",
            color: "#007bff",
            "&:hover": {
              borderColor: "#0056b3",
              backgroundColor: "#f8f9fa",
            },
          }}
        >
          {selectedImage ? "Ganti Foto" : "Upload Foto"}
        </Button>
        {formik.touched[name] && formik.errors[name] && (
          <Typography
            variant="body2"
            sx={{
              color: "#d32f2f",
              textAlign: "center",
              fontSize: "12px",
              marginTop: 1,
              fontWeight: 500,
            }}
          >
            {formik.errors[name]}
          </Typography>
        )}
      </Box>
    </section>
  );
};

export default UploadImageHorizontal;
