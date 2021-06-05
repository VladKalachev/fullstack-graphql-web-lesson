import React from "react";
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import Wrapper from "../components/Wrapper";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper>
    <Formik initialValues={{ username: '', password: ''}}
    onSubmit={(value) => {
      console.log(value);
    }}>
     {({values, handleChange}) => (
        <Form>
         <FormControl>
           <FormLabel htmlFor="username">Username</FormLabel>
           <Input 
            value={values.username} 
            id="username" 
            onChange={handleChange} 
            placeholder="username"
          />
           <FormErrorMessage></FormErrorMessage>
         </FormControl>
       </Form>
     )}
    </Formik>
    </Wrapper>
  );
}

export default Register;
