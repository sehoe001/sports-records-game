// Game data
let gameCounter = 0;
const sportsRecords = [
  {
    answer: "adrian peterson",
    question: "Who had the most rushing yards in the 2012 NFL season?",
    clues: [
      "In football, I set the record for rushing yards in the 2012 season",
      "I played for the Minnesota Vikings",
      "I was named MVP after returning from an ACL injury",
      "I rushed for 2,097 yards in 2012",
      "🏈 I averaged 6.0 yards per carry in 2012"
    ]
  },
  {
    answer: "aaron judge",
    question: "Who hit 62 home runs in the 2022 MLB season?",
    clues: [
      "In baseball, I set the record for home runs in the 2022 season",
      "I played for the New York Yankees",
      "I was named MVP and broke Roger Maris' record",
      "I hit 62 home runs in 2022",
      "⚾ I also led the league in RBIs and runs in 2022"
    ]
  },
  {
    answer: "steph curry",
    question: "Who made 402 three-pointers in the 2015-16 NBA season?",
    clues: [
      "In basketball, I set the record for three-pointers in the 2015-16 season",
      "I played for the Golden State Warriors",
      "I was unanimously named MVP this season",
      "I made 402 three-pointers in 2015-16",
      "🏀 My team won a record 73 games in 2015-16"
    ]
  },
  {
    answer: "wayne gretzky",
    question: "Who scored 215 points in the 1985-86 NHL season?",
    clues: [
      "In hockey, I set the record for points in the 1985-86 season",
      "I played for the Edmonton Oilers",
      "I won the Hart Trophy as league MVP",
      "I scored 215 points in 1985-86",
      "🏒 I had 163 assists in 1985-86, also a record"
    ]
  },
  {
    answer: "michael jordan",
    question: "Who averaged 37.1 points in the 1986-87 NBA season?",
    clues: [
      "In basketball, I set the record for scoring in the 1986-87 season",
      "I played for the Chicago Bulls",
      "I won the scoring title this season",
      "I averaged 37.1 points per game in 1986-87",
      "🏀 I scored 3,041 points in 1986-87"
    ]
  },
  {
    answer: "tom brady",
    question: "Who threw 50 touchdown passes in the 2007 NFL season?",
    clues: [
      "In football, I set the record for touchdown passes in the 2007 season",
      "I played for the New England Patriots",
      "I was named MVP in an undefeated regular season",
      "I threw 50 touchdown passes in 2007",
      "🏈 I led my team to a 16-0 record in 2007"
    ]
  },
  {
    answer: "barry bonds",
    question: "Who hit 73 home runs in the 2001 MLB season?",
    clues: [
      "In baseball, I set the record for home runs in the 2001 season",
      "I played for the San Francisco Giants",
      "I was named MVP with a .863 slugging percentage",
      "I hit 73 home runs in 2001",
      "⚾ I was walked 177 times in 2001"
    ]
  },
  {
    answer: "wilt chamberlain",
    question: "Who averaged 50.4 points in the 1961-62 NBA season?",
    clues: [
      "In basketball, I set the record for scoring in the 1961-62 season",
      "I played for the Philadelphia Warriors",
      "I scored 100 points in a single game this season",
      "I averaged 50.4 points per game in 1961-62",
      "🏀 I also grabbed 25.7 rebounds per game in 1961-62"
    ]
  }
];

// Players list
const players = [
  // Current and historical players (all lowercase to match answers)
  "aaron judge",
  "adrian peterson",
  "barry bonds",
  "michael jordan",
  "steph curry",
  "stephen curry",
  "tom brady",
  "wayne gretzky",
  "wilt chamberlain",
  
  // Additional suggestions
  "lebron james",
  "Gerrit Cole",
  "Max Scherzer",
  "Clayton Kershaw",
  
  // Current NBA Players
  "LeBron James",
  "Stephen Curry",
  "Kevin Durant",
  "Giannis Antetokounmpo",
  "Nikola Jokic",
  "Joel Embiid",
  "Luka Doncic",
  "Jayson Tatum",
  "Ja Morant",
  "Devin Booker",

  // Current NFL Players
  "Patrick Mahomes",
  "Josh Allen",
  "Lamar Jackson",
  "Justin Jefferson",
  "Travis Kelce",
  "Aaron Donald",
  "T.J. Watt",
  "Nick Bosa",
  "Christian McCaffrey",
  "Derrick Henry",
  
  // Current NHL Players
  "Connor McDavid",
  "Nathan MacKinnon",
  "Auston Matthews",
  "Leon Draisaitl",
  "Cale Makar",
  "Sidney Crosby",
  "Alex Ovechkin",
  "Nikita Kucherov",
  "David Pastrnak",
  "Jack Hughes",

  // Historical Players
  "Adrian Peterson",
  "LeBron James",
  "Tom Brady",
  "Michael Jordan",
  "Wayne Gretzky",
  "Barry Bonds",
  "Peyton Manning",
  "Kobe Bryant",
  "Sidney Crosby",
  "Derek Jeter",
  "Jerry Rice",
  "Kareem Abdul-Jabbar",
  "Mario Lemieux",
  "Babe Ruth",
  "Joe Montana",
  "Magic Johnson",
  "Bobby Orr",
  "Willie Mays",
  "Emmitt Smith",
  "Larry Bird",
  "Gordie Howe",
  "Hank Aaron",
  "Walter Payton",
  "Bill Russell",
  "Mark Messier",
  "Pete Rose",
  "Barry Sanders",
  "Wilt Chamberlain",
  "Bobby Hull",
  "Ted Williams",
  "Dan Marino",
  "Oscar Robertson",
  "Maurice Richard",
  "Stan Musial",
  "Jim Brown",
  "Julius Erving",
  "Jean Beliveau",
  "Mickey Mantle",
  "Johnny Unitas",
  "Hakeem Olajuwon",
  "Patrick Roy",
  "Ken Griffey Jr.",
  "Lawrence Taylor",
  "David Robinson",
  "Martin Brodeur",
  "Roger Clemens",
  "Deion Sanders",
  "Karl Malone",
  "Bobby Clarke",
  "Greg Maddux",
  "Jerry West",
  "Phil Esposito",
  "Randy Johnson",
  "Dick Butkus",
  "Charles Barkley",
  "Tony Esposito",
  "Nolan Ryan",
  "Reggie White",
  "Patrick Ewing",
  "Brett Hull",
  "Cal Ripken Jr.",
  "Ray Lewis",
  "John Stockton",
  "Chris Chelios",
  "Pedro Martinez",
  "Bruce Smith",
  "Isiah Thomas",
  "Steve Yzerman",
  "Sandy Koufax",
  "Mean Joe Greene",
  "Gary Payton",
  "Scott Stevens",
  "Tom Seaver",
  "Jack Lambert",
  "Clyde Drexler",
  "Paul Coffey",
  "Bob Gibson",
  "Ronnie Lott",
  "George Gervin",
  "Mike Bossy",
  "Bob Feller",
  "Alan Page",
  "Dominique Wilkins",
  "Denis Potvin",
  "Warren Spahn",
  "Walter Jones",
  "James Worthy",
  "Larry Murphy",
  "Christy Mathewson",
  "Anthony Munoz",
  "Robert Parish",
  "Luc Robitaille",
  "Cy Young",
  "John Hannah",
  "Alex English",
  "Grant Fuhr",
  "Walter Johnson",
  "Mike Haynes",
  "Bernard King",
  "Billy Smith",
  "Ty Cobb",
  "Art Shell",
  "Dave Cowens",
  "Mike Gartner"
];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Get game index from URL
    const requestUrl = new URL(request.url);
    const gameId = requestUrl.searchParams.get('gameId');
    console.log('Received gameId:', gameId);
    
    // If no gameId or invalid, use a random game
    let currentGame;
    if (!gameId) {
      currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];
    } else {
      // Use the random part of the gameId for selection
      const random = parseInt(gameId.split('-')[1]);
      const index = random % sportsRecords.length;
      currentGame = sportsRecords[index];
    }
    console.log('Selected game:', currentGame.answer);
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    const path = requestUrl.pathname.slice(1); // Remove leading slash

    try {
      switch (path) {
        case 'clue': {
          const attempt = parseInt(requestUrl.searchParams.get('attempt'));
          if (attempt >= 0 && attempt < currentGame.clues.length) {
            const response = {
              clue: currentGame.clues[attempt],
              question: currentGame.question
            };
            
            // Add answer on the last attempt
            if (attempt === currentGame.clues.length - 1) {
              response.answer = currentGame.answer;
            }
            
            return new Response(
              JSON.stringify(response),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          return new Response(
            JSON.stringify({ error: 'Invalid attempt number' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'guess': {
          const { guess } = await request.json();
          console.log('Received guess:', guess);
          console.log('Current answer:', currentGame.answer);
          
          // Clean up the guess and answer by removing spaces and making lowercase
          const cleanGuess = guess.toLowerCase().trim();
          const cleanAnswer = currentGame.answer.toLowerCase().trim();
          const correct = cleanGuess === cleanAnswer;
          
          console.log('Clean guess:', cleanGuess);
          console.log('Clean answer:', cleanAnswer);
          console.log('Is correct:', correct);

          return new Response(
            JSON.stringify({ correct }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'new-game': {
          // Generate a random game ID using timestamp and random index
          const timestamp = Date.now();
          const randomIndex = Math.floor(Math.random() * sportsRecords.length);
          const newGameId = `${timestamp}-${randomIndex}`;
          console.log('Generated new gameId:', newGameId);
          
          return new Response(
            JSON.stringify({ success: true, gameId: newGameId }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'players/search': {
          try {
            const query = requestUrl.searchParams.get('q');
            if (!query) {
              return new Response(
                JSON.stringify({ matches: [] }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
            const queryLower = query.toLowerCase();
            const matches = players
            .filter(player => player.toLowerCase().includes(queryLower))
            .sort((a, b) => {
              const aStartsWith = a.toLowerCase().startsWith(queryLower);
              const bStartsWith = b.toLowerCase().startsWith(queryLower);
              if (aStartsWith && !bStartsWith) return -1;
              if (!aStartsWith && bStartsWith) return 1;
              return a.localeCompare(b);
            })
            .slice(0, 10);
          return new Response(
            JSON.stringify({ matches }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
          } catch (error) {
            console.error('Search error:', error);
            return new Response(
              JSON.stringify({ matches: [], error: 'Search failed' }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        default:
          return new Response(
            JSON.stringify({ error: 'Not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};
