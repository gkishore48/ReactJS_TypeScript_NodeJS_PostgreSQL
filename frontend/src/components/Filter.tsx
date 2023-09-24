import { FC } from 'react';
import '../App.css'
import { Formik, Field, Form } from "formik";
type props = {
  filterHandler: (params:any) => void;
}

const Filters:FC<props> = ({filterHandler}) => {
    return (
        <div className="App">
          <Formik
            initialValues={{ oem: "All", vehicleType: "All" }}
            onSubmit={async  (values) => {
              await filterHandler(values)
            }}
          >
            <Form>
                <label htmlFor="oem">OEM:</label>
                <Field as="select" name="oem">
                    <option value="Perdoua">Perdoua</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Proton">Proton</option>
                    <option value="All">All</option>
                </Field>
                <label htmlFor="vehicleType">Vehicle Type:</label>
                <Field as="select" name="vehicleType">
                    <option value="Suv">Suv</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="All">All</option>
                </Field>
              <button className='filter-button' type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      );
}

export default Filters