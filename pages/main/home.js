import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { AuthPage } from "middleware/authorizationPage";
import Cookie from "js-cookie";

// Server Side Rendering
// export async function getServerSideProps(context) {
//   console.log("Server render is Running !!");
//   const dataCookie = await AuthPage(context);
//   const response = await axios
//     .get("user?page=1&limit=2&search=&sort=", {
//       headers: {
//         Authorization: `Bearer ${dataCookie.token}`,
//       },
//     })
//     .then((res) => {
//       return res.data.data;
//     })
//     .catch((err) => {
//       return [];
//     });
//   return {
//     props: { data: response },
//   };
// }

export default function Home(props) {
  // Client Side Rendering
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getDataUser();
  // }, []);

  // const getDataUser = () => {
  //   axios.get("user?page=1&limit=2&search=&sort=");
  // };
  const id = Cookie.get("id");

  console.log(props);
  console.log(id);

  return (
    <>
      <Layout title="HomePage">
        <h1>HomePage</h1>
        {/* {props.data.map((item) => (
          <div key={item.id}>
            <h3>{item.firstName}</h3>
            <hr></hr>
          </div>
        ))} */}
      </Layout>
    </>
  );
}
