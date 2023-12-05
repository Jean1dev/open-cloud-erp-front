import { useCallback, useRef, useState } from 'react';
import { addXTenant } from '../api';

const DEFAULT_TENANT = 'Globo EPI'

export function usePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const tenants = [DEFAULT_TENANT, 'Acme Corp'];
  const [selectedTenant, setSelectedTenant] = useState(DEFAULT_TENANT)

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const changeTenant = useCallback((val) => {
    setSelectedTenant(val)
    handleClose()
    if (val !== DEFAULT_TENANT) {     
      console.log('changing tenant ', val) 
      addXTenant(val)
    }
  }, [handleClose])

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    changeTenant,
    open,
    tenants,
    selectedTenant
  };
}
