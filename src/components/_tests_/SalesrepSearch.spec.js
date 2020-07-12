
const filterByTerm= require("./filterByTerm");
describe("Filter salesrep",()=>{
    test("This Filter by salesrep username",()=>{
        const input =[
    
            {id:1,salesrepUserName:"namal-perera"},
            {id:2,salesrepUserName:"kamal-fernando"},
            {id:3,salesrepUserName:"saman-kumara"}

        ];
        const filteredOutput =[{id:1,salesrepUserName:"namal-perera"}];
        expect(filterByTerm(input,"namal")).toEqual(filteredOutput);
        expect(filterByTerm(input,"Nam")).toEqual(filteredOutput);
    });
});

