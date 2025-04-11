// export async function fetchData(url, options) {
//     let state = {
//         loading: true,
//         error: null,
//         data: null,
//     };

//     try {
//         const res = await fetch(url, options);
//         if (!res.ok) {
//             throw new Error("Failed to fetch data");
//         }
//         const data = await res.json();
//         state = { loading: false, error: null, data };
//     } catch (error) {
//         state = { loading: false, error: error.message, data: null };
//     }

//     return state;
// }

