// import axios from 'axios';
//
// const search = () => {
//     axios.post("http://localhost:8080/api/yelp", {"test":"test"})
//         .then(res => {
//             console.log(res)
//         })
// }


const test = {
    test: "888787"
};
const executeSearch = () => {
    fetch("http://localhost:8080/api/yelp", {
        method: "POST",
        body: JSON.stringify(test),
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        }
    }).then(res => console.log(res))
        .catch(error => {console.log(error)})
};

executeSearch();