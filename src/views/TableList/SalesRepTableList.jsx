import React from "react";
// nodejs library to set properties for components
//import PropTypes from "prop-types";

// core components

import Table from "components/Table/Table.jsx";

function SalesRepTableList() {
    
    return (
            
              <Table
                tableHeaderColor="primary"
                tableHead={["userName","Name", "Area", "Address", "Phone Number","Action"]}
                tableData={[
                  ["nimal1","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["kamal3","Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["gagana","Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["chamod","Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["perera","Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["kanil","Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
              />

           
    );
  }
  
  export default SalesRepTableList;
  