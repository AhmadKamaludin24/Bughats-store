"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useEffect, useTransition } from 'react'
import { deleteProduct, toggleAvailability } from '../products/_actions/action'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog'


export const ToggleActivateProduct = ({id, isavailable} : {id: string, isavailable: boolean}) => {
    const [isPending, startTransition] = useTransition()
    useEffect(()=>{

    },[])

  return (
    <DropdownMenuItem disabled={isPending} onClick={()=> startTransition(async () => {await toggleAvailability(id, !isavailable) })}>
      {isavailable ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

export const DeleteProductDropDown = ({id} : {id: string}) => {
  const [isPending, startTransition] = useTransition()


return (
  <>
   
        <DropdownMenuItem disabled={isPending}  onClick={() =>
              startTransition(async () => {
                await deleteProduct(id);
              })
            } >
        <p className='text-red-700' >Delete</p>
        </DropdownMenuItem>
     
  </>
 

)}


// onClick={()=> startTransition(async () => {await deleteProduct(id) })}