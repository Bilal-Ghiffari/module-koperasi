import IdentitasPemberiValidationSchema, {
  initialValuesIdentitasPemberi,
} from './IdentitasPemberiValidationSchema';
import IdentitasPenerimaValidationSchema, {
  initialValuesIdentitasPenerima,
} from './IdentitasPenerimaValidationSchema';

import InformasiJaminanValidationSchema, {
  initialValuesInformasiJaminan,
} from './InformasiJaminanValidationSchema';

import ObyekJaminanValidationSchema, {
  initialValuesObyekJaminan,
} from './ObyekJaminanValidationSchema';

export const formSchemas = {
  validationSchemas: {
    identitasPemberi: IdentitasPemberiValidationSchema,
    identitasPenerima: IdentitasPenerimaValidationSchema,
    informasiJaminan: InformasiJaminanValidationSchema,
    ObyekJaminan: ObyekJaminanValidationSchema,
  },
  initialValues: {
    identitasPemberi: initialValuesIdentitasPemberi,
    identitasPenerima: initialValuesIdentitasPenerima,
    informasiJaminan: initialValuesInformasiJaminan,
    ObyekJaminan: initialValuesObyekJaminan,
  },
};

// Optional: Tetap eksport untuk backward compatibility
export const { validationSchemas, initialValues } = formSchemas;
