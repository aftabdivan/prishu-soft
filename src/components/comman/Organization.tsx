import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";

interface OrganizationInterface {
  organizationName: string;
  organizationShortName: string;
  organizationURL: string;
  organizationLOGO: string;
  id: string;
  // TODO: add type here if requires any other data to render it
}

interface OrganizationResponseInterface {
  data: { data: Array<OrganizationInterface> };
}

const Organization = () => {
  const [organizationData, setOrganizationData] = useState<
    Array<OrganizationInterface>
  >([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${config.baseURL}Organization/getAllOrganization`)
      .then((data: OrganizationResponseInterface) => {
        setOrganizationData(data.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="organization-main-div">
      <div className="organization-button-div">
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            navigate("/add-organization");
          }}
        >
          Add Organization
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Organization Name</th>
              <th scope="col">Short Name</th>
              <th scope="col">URL</th>
              <th scope="col">Logo</th>
            </tr>
          </thead>
          <tbody>
            {organizationData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.organizationName}</td>
                  <td>{item.organizationShortName}</td>
                  <td>{item.organizationURL}</td>
                  <td>{item.organizationLOGO}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Organization;
