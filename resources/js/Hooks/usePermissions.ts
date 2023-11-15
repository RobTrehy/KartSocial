import { InertiaSharedProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function usePermissions<T = {}>() {
  const page = usePage<InertiaSharedProps<T>>();
  return page.props.auth.permissions ? page.props.auth.permissions : [];
}
