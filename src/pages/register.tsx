import React from "react";
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";

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
          <InputField 
            name="username" 
            placeholder="username" 
            label="Username" 
            />
          <InputField 
            name="password" 
            placeholder="password" 
            label="Password"
            type="password"
            />
       </Form>
     )}
    </Formik>
    </Wrapper>
  );
}

export default Register;
