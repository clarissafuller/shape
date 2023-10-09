require("dotenv").config();

async function getAPIExercises(searchTerms) {
  try {
    let params = Object.keys(searchTerms)
      .map((key) => `${key}=${searchTerms[key]}`)
      .join("&");
    // let params = `name=${name}`;
    // if (muscle) params += `&muscle=${muscle}`;
    console.log(params);
    const response = await fetch(
      `https://api.api-ninjas.com/v1/exercises?${params}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      }
    );

    const exercises = await response.json();

    return exercises;
    //   url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,

    // }, function(error, response, body) {
    //   if(error) return console.error('Request failed:', error);
    //   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    //   else console.log(body)
    // });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getAPIExercises };
