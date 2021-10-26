import React, { FC } from "react";
import { Country as CountryEntity } from "../interfaces/entity";

const Country: FC<{ countryInfo: CountryEntity }> = ({ countryInfo }) => {
  const { name, region, callingCodes = [] } = countryInfo;

  return (
    <>
      {name && (
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <section className="card-text">
                <span className="text-info">
                  <strong>Calling Codes:</strong>
                </span>
                <ul>
                  {callingCodes?.map((callingCode, i) => (
                    <li key={i}>{callingCode}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="card-footer text-end">
              <small className="text-muted">{region}</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
