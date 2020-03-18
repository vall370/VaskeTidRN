export const buildingValidator = building => {

  if (!building || building.length <= 0) return 'building cannot be empty.';
  return '';
};

export const apartmentValidator = apartment => {

  if (!apartment || apartment.length <= 0) return 'apartment cannot be empty.';
  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
