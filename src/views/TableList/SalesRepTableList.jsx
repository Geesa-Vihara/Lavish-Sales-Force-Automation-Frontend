import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// core components

import Table from "components/Table/Table.jsx";

function SalesRepTableList() {
    
    return (
            
              <Table
                tableHeaderColor="primary"
                tableHead={["ID","Name", "Area", "Address", "Phone Number","Action"]}
                tableData={[
                  ["2334","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["3456","Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["5678","Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["1234","Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["7890","Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["9887","Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
              />

           
    );
  }
  
  export default SalesRepTableList;
  