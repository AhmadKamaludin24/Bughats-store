"use client"
import { Card } from "@/components/ui/card";
import BreadcumbComponents from "../_components/BreadcumbComponents";
import UsersTable from "../_components/UsersTable";
import { usePathname } from "next/navigation";



export default function Page() {
  const pathname = usePathname()
    return (
        <>
          <BreadcumbComponents page={pathname} />
            <div className="flex flex-1 flex-col gap-4 pt-0 p-5">
              <div className=" flex-1 gap-4 rounded-2xl bg-muted/100 p-6">
                <div className="bg-card rounded-xl p-5 ">
                  <UsersTable/>
               </div>
        
            
              </div>
      
            </div>
        </>
      
    )
  }
  