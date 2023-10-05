import { FC, useState, useEffect } from 'react';
import '../App.css'
import { Formik, Field, Form } from "formik";
import Axios from "axios";

type props = {
  filterHandler: (params: any) => void;
}
type IOemDataType = {
  id: string;
  name: string;
};
type IVechileTypeDataType = {
  model_type: string;
};


const Filters: FC<props> = ({ filterHandler }) => {
  const [oemData, setOemData] = useState<IOemDataType[]>([])
  const [vechileTypeData, setVechileTypeData] = useState<IVechileTypeDataType[]>([])
  useEffect(() => {
    Axios.get("/api/cars/oem").then((response) => {
      setOemData(response.data);
    }).catch(err => console.warn(err));
    Axios.get("/api/cars/vechile_type").then((response) => {
      setVechileTypeData(response.data);
    }).catch(err => console.warn(err));
  }, []);
  return (
    <div className="App">
      <Formik
        initialValues={{ oem: "All", vehicleType: "All" }}
        onSubmit={async (values) => {
          await filterHandler(values)
        }}
      >
        <Form>
          <label htmlFor="oem">OEM:</label>
          <Field as="select" name="oem">
          <option value="All">All</option>
            {oemData.map(values => {
              return (
                <option key={values.id} value={values.name}>{values.name}</option>
              )
            })}
          </Field>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <Field as="select" name="vehicleType">
            <option value="All">All</option>
            {vechileTypeData.map(values => {
              return (
                <option key={values.model_type} >{values.model_type}</option>
              )
            })}
          </Field>
          <button className='filter-button' type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Filters