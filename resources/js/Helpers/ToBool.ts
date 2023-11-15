export function ToBool(value: string | boolean | null) {
  if (value || value == 'true' || value == 'yes') {
    return true;
  } else {
    return false;
  }
}
