import axios from "axios";


const instances = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
        accept:'application/json',
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjA3YzMxOTQyNTZmYzgwMWYzOTlhYzY4MDZkNTQyMSIsIm5iZiI6MTc0MDMwNjM0OC44MSwic3ViIjoiNjdiYWY3YWMyZWRjOWMxM2ZiMGE5NzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZZvA-Ey-U2B_-730E5U7tCTbgiozw_serWt5p34hjOI'
      }

    }) ;

    export default instances ; 
    



