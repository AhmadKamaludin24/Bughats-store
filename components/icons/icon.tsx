import React from 'react'

const Icon = ({props} : {props: boolean}) => {
  return (
    <div>
        {props ? <img src="/icons/approved.png" width={"30px"} alt='icon'/> : <img src="/icons/rejected.png" width={"30px"} alt='icon'/>}
      
    </div>
  )
}

export default Icon
