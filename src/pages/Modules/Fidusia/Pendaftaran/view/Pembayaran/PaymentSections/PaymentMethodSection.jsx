import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Bank Logos
import BCALogo from '@/assets/bank/BCA.png';
import MandiriLogo from '@/assets/bank/Mandiri.png';
import BRILogo from '@/assets/bank/BRI.png';
import BNILogo from '@/assets/bank/BNI.png';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2),
  backgroundColor: 'white',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const PaymentMethodSection = ({ selectedMethod, setSelectedMethod }) => {
  const paymentMethods = [
    {
      id: 'bca',
      name: 'Bank BCA',
      logo: BCALogo,
      type: 'Virtual Account',
    },
    {
      id: 'mandiri',
      name: 'Bank Mandiri',
      logo: MandiriLogo,
      type: 'Virtual Account',
    },
    {
      id: 'bri',
      name: 'Bank BRI',
      logo: BRILogo,
      type: 'Virtual Account',
    },
    {
      id: 'bni',
      name: 'Bank BNI',
      logo: BNILogo,
      type: 'Virtual Account',
    },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 'bold', mb: 2, color: '#1A237E' }}
      >
        Metode Pembayaran
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Silakan pilih metode pembayaran yang Anda inginkan
      </Typography>

      <RadioGroup
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        {paymentMethods.map((method) => (
          <div
            onClick={() => setSelectedMethod(method.id)}
            className="cursor-pointer"
          >
            <StyledPaper
              key={method.id}
              elevation={0}
              sx={{
                mb: 2,
                border:
                  selectedMethod === method.id
                    ? '1px solid #1A237E'
                    : '1px solid #E0E0E0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={method.logo}
                  alt={method.name}
                  style={{ height: 40, width: 'auto', marginRight: 16 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {method.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {method.type}
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                value={method.id}
                control={<Radio />}
                label=""
                labelPlacement="start"
              />
            </StyledPaper>
          </div>
        ))}
      </RadioGroup>
    </Box>
  );
};

export default PaymentMethodSection;
