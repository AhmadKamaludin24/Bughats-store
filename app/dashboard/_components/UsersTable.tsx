"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import ButtonModals from './buttonModals'
import { usePathname, useRouter } from 'next/navigation'

const UsersTable = () => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div>
        <div className='mb-3 flex justify-between'>
            <h1>Data User</h1>
            <ButtonModals title='Add user' action={()=>router.push(`${pathname}/adduser`)}/>
        </div>
       
        <div className='w-full border rounded '>
      <Table>
        
        <TableHeader>   
            <TableRow>
                <TableHead>id</TableHead>
                <TableHead>username</TableHead>
                
                <TableHead>email</TableHead>
                <TableHead>action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </div>
    </div>
   
  )
}

export default UsersTable
