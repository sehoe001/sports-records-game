// Game data
let gameCounter = 0;

// Initialize worker state
const initializeWorkerState = (env) => {
  if (!env.CURRENT_GAME) {
    env.CURRENT_GAME = JSON.stringify({});
  }
};

// Players list
const players = [
  // Current NBA Players
  "Giannis Antetokounmpo",
  "LeBron James",
  "Stephen Curry",
  "Kevin Durant",
  "Joel Embiid",
  "Luka Doncic",
  "Jayson Tatum",
  "Ja Morant",
  "Nikola Jokic",
  "Devin Booker",
  "Damian Lillard",
  "Trae Young",
  "Anthony Davis",
  "Jimmy Butler",
  
  // Current NFL Players
  "Patrick Mahomes",
  "Travis Kelce",
  "Christian McCaffrey",
  "Justin Jefferson",
  "Derrick Henry",
  "Josh Allen",
  "Jalen Hurts",
  "Nick Bosa",
  "Aaron Donald",
  "Micah Parsons",
  "Lamar Jackson",
  "Justin Herbert",
  "Joe Burrow",
  "Cooper Kupp",
  
  // Current MLB Players
  "Aaron Judge",
  "Shohei Ohtani",
  "Mike Trout",
  "Mookie Betts",
  "Juan Soto",
  "Ronald Acuna Jr.",
  "Freddie Freeman",
  "Trea Turner",
  "Jose Ramirez",
  "Corbin Burnes",
  "Jacob deGrom",
  "Gerrit Cole",
  "Fernando Tatis Jr.",
  "Bryce Harper",
  
  // Current NHL Players
  "Connor McDavid",
  "Alex Ovechkin",
  "Nathan MacKinnon",
  "Auston Matthews",
  "Sidney Crosby",
  "Leon Draisaitl",
  "Cale Makar",
  "David Pastrnak",
  "Nikita Kucherov",
  "Artemi Panarin",
  "Jack Hughes",
  "Roman Josi",
  "Igor Shesterkin",
  "Andrei Vasilevskiy",
  
  // Historical NBA Players
  "Michael Jordan",
  "Kobe Bryant",
  "Magic Johnson",
  "Larry Bird",
  "Kareem Abdul-Jabbar",
  "Wilt Chamberlain",
  "Bill Russell",
  "Tim Duncan",
  "Hakeem Olajuwon",
  "Shaquille O'Neal",
  "Karl Malone",
  "Charles Barkley",
  "David Robinson",
  "Allen Iverson",
  
  // Historical NFL Players
  "Tom Brady",
  "Jerry Rice",
  "Joe Montana",
  "Peyton Manning",
  "Barry Sanders",
  "Lawrence Taylor",
  "Walter Payton",
  "John Elway",
  "Reggie White",
  "Dan Marino",
  "Adrian Peterson",
  "Brett Favre",
  "Randy Moss",
  "Deion Sanders",
  
  // Historical MLB Players
  "Barry Bonds",
  "Babe Ruth",
  "Willie Mays",
  "Hank Aaron",
  "Ken Griffey Jr.",
  "Derek Jeter",
  "Ted Williams",
  "Mickey Mantle",
  "Stan Musial",
  "Roberto Clemente",
  "Sandy Koufax",
  "Greg Maddux",
  "Pedro Martinez",
  "Randy Johnson",
  
  // Historical NHL Players
  "Wayne Gretzky",
  "Mario Lemieux",
  "Gordie Howe",
  "Bobby Orr",
  "Maurice Richard",
  "Mark Messier",
  "Bobby Hull",
  "Jean Beliveau",
  "Patrick Roy",
  "Martin Brodeur",
  "Steve Yzerman",
  "Joe Sakic",
  "Jaromir Jagr",
  "Dominik Hasek",
  
  // Other Sports Legends
  "Muhammad Ali",
  "Tiger Woods",
  "Serena Williams",
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Pele",
  "Diego Maradona",
  "Roger Federer",
  "Rafael Nadal",
  "Michael Phelps",
  "Usain Bolt",
  "Jackie Robinson",
  "Jesse Owens",
  "Jack Nicklaus",
  "Cristiano Ronaldo",
  "Roger Federer",
  "Michael Phelps",
  "Usain Bolt",
  "Pele",
  "Willie Mays",
  "Roberto Clemente",
  "Ty Cobb"
];

// Normalize the answers to match the player list exactly
const findExactPlayer = (answer) => {
  if (!answer) {
    return null;
  }

  // First try exact match
  const exactMatch = players.find(p => p === answer);
  if (exactMatch) {
    return exactMatch;
  }
  
  // Try case-insensitive match
  const normalizedMatch = players.find(p => p.toLowerCase() === answer.toLowerCase());
  if (normalizedMatch) {
    return normalizedMatch;
  }
  
  return null;
};

const sportsRecords = [
  {
    answer: findExactPlayer("Adrian Peterson"),
    question: "Who led the NFL in rushing yards in 2012?",
    clues: [
      "I rushed for 2,097 yards this season",
      "I played for the Minnesota Vikings",
      "I was named MVP after returning from an ACL injury",
      "I averaged 6.0 yards per carry",
      "🏈 I had twelve 100+ yard rushing games"
    ]
  },
  {
    answer: findExactPlayer("Aaron Judge"),
    question: "Who led the American League in home runs in 2022?",
    clues: [
      "I hit 62 home runs this season",
      "I played for the New York Yankees",
      "I was named AL MVP this season",
      "I broke Roger Maris' AL record",
      "⚾ I also led the league with 131 RBIs"
    ]
  },
  {
    answer: findExactPlayer("Stephen Curry"),
    question: "Who led the NBA in three-pointers made in 2015-16?",
    clues: [
      "I made 402 three-pointers this season",
      "I played for the Golden State Warriors",
      "I was unanimously named MVP this season",
      "My team won a record 73 games",
      "🏀 I averaged 30.1 points per game"
    ]
  },
  {
    answer: findExactPlayer("Wayne Gretzky"),
    question: "Who led the NHL in points in 1985-86?",
    clues: [
      "I scored 215 points this season",
      "I played for the Edmonton Oilers",
      "I won the Hart Trophy as league MVP",
      "I had 163 assists that season",
      "🏒 This was one of my four 200+ point seasons"
    ]
  },
  {
    answer: findExactPlayer("Michael Jordan"),
    question: "Who led the NBA in scoring in 1986-87?",
    clues: [
      "I averaged 37.1 points per game",
      "I played for the Chicago Bulls",
      "I won my first of ten scoring titles",
      "I scored 3,041 total points",
      "🏀 I also averaged 2.9 steals per game"
    ]
  },
  {
    answer: findExactPlayer("Tom Brady"),
    question: "Who led the NFL in touchdown passes in 2007?",
    clues: [
      "I threw 50 touchdown passes this season",
      "I played for the New England Patriots",
      "I was named MVP that season",
      "I led my team to a 16-0 record",
      "🏈 I also threw for 4,806 yards"
    ]
  },
  {
    answer: findExactPlayer("Barry Bonds"),
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
    answer: findExactPlayer("Wilt Chamberlain"),
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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // Initialize worker state
    initializeWorkerState(env);

    // Get game index from URL
    const requestUrl = new URL(request.url);
    const gameId = requestUrl.searchParams.get('gameId');
    console.log('Received gameId:', gameId);
    
    // Initialize worker state if needed
    let currentGameState;
    try {
      currentGameState = env.CURRENT_GAME ? JSON.parse(env.CURRENT_GAME) : {};
    } catch (error) {
      console.error('Error parsing game state:', error);
      currentGameState = {};
    }

    // If no gameId, create a new random game
    let currentGame;
    if (!gameId) {
      const randomIndex = Math.floor(Math.random() * sportsRecords.length);
      const record = sportsRecords[randomIndex];
      currentGame = {
        ...record,
        answer: findExactPlayer(record.answer)
      };
    } else {
      // Get the game from stored state
      console.log('Looking for game:', {
        gameId,
        allGames: Object.keys(currentGameState),
        targetGame: currentGameState[gameId]
      });
      currentGame = currentGameState[gameId];
      
      // Fallback to sportsRecords if game not found in state
      if (!currentGame) {
        console.log('Game not found in state, using fallback');
        const random = parseInt(gameId.split('-')[1]);
        const index = random % sportsRecords.length;
        const record = sportsRecords[index];
        // Make sure to normalize the answer
        currentGame = {
          ...record,
          answer: findExactPlayer(record.answer)
        };
        // Store the fallback game in state
        currentGameState[gameId] = currentGame;
        env.CURRENT_GAME = JSON.stringify(currentGameState);
        console.log('Created and stored fallback game:', currentGame);
      }
    }
    console.log('Selected game:', currentGame?.answer);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Log the request details
    console.log('Request:', {
      method: request.method,
      path: requestUrl.pathname,
      gameId,
      currentGame: currentGame?.answer
    });

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
          const { guess, gameId } = await request.json();
          console.log('Received guess:', { guess, gameId });
          
          // Get current game state
          let currentGameState;
          try {
            currentGameState = env.CURRENT_GAME ? JSON.parse(env.CURRENT_GAME) : {};
          } catch (error) {
            console.error('Error parsing game state:', error);
            currentGameState = {};
          }
          
          // Get the game from stored state
          console.log('Looking for game:', {
            gameId,
            allGames: Object.keys(currentGameState),
            targetGame: currentGameState[gameId]
          });
          const currentGame = currentGameState[gameId];
          
          // Verify we have a valid game state
          if (!currentGame || !currentGame.answer) {
            console.error('No valid game state found for gameId:', gameId);
            return new Response(
              JSON.stringify({ error: 'Invalid game state' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          // Clean up and normalize the guess
          const cleanGuess = guess.trim();
          console.log('Clean guess:', cleanGuess);
          
          // Normalize the guess - the answer is already normalized
          const normalizedGuess = findExactPlayer(cleanGuess);
          console.log('Normalized guess:', { cleanGuess, normalizedGuess });
          
          // Get the normalized answer from the current game
          const normalizedAnswer = findExactPlayer(currentGame.answer);
          console.log('Normalized answer:', { 
            storedAnswer: currentGame.answer, 
            normalizedAnswer,
            storedType: typeof currentGame.answer,
            storedLength: currentGame.answer?.length,
            storedChars: currentGame.answer ? [...currentGame.answer].map(c => c.charCodeAt(0)) : null
          });
          
          // If either guess or answer is invalid, return false
          if (!normalizedGuess || !normalizedAnswer) {
            console.log('Invalid guess or answer - not found in players list');
            return new Response(
              JSON.stringify({ correct: false }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          
          // Compare the normalized values
          const guessIsCorrect = normalizedGuess === normalizedAnswer;
          
          console.log('Full comparison:', {
            gameId,
            currentGame,
            cleanGuess,
            normalizedGuess,
            storedAnswer: currentGame.answer,
            normalizedAnswer,
            guessIsCorrect,
            guessChars: [...normalizedGuess].map(c => c.charCodeAt(0)),
            answerChars: [...normalizedAnswer].map(c => c.charCodeAt(0))
          });
          
          console.log('Result:', {
            guessIsCorrect,
            guessType: typeof normalizedGuess,
            answerType: typeof currentGame.answer
          });

          return new Response(
            JSON.stringify({ correct: guessIsCorrect }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'new-game': {
          // Generate a random game ID using timestamp and random index
          const timestamp = Date.now();
          const randomIndex = Math.floor(Math.random() * sportsRecords.length);
          const newGameId = `${timestamp}-${randomIndex}`;
          console.log('Generated new gameId:', newGameId);
          
          // Initialize game state
          const currentGameState = env.CURRENT_GAME ? JSON.parse(env.CURRENT_GAME) : {};
          
          // Get the record
          const record = sportsRecords[randomIndex];
          console.log('Selected record:', record);
          
          // Normalize the answer using findExactPlayer
          const normalizedAnswer = findExactPlayer(record.answer);
          console.log('Normalized answer:', normalizedAnswer);
          
          // Store the game state with the normalized answer
          const newGameState = {
            ...record,
            answer: normalizedAnswer
          };
          
          // Store the new game
          currentGameState[newGameId] = newGameState;
          
          // Update the worker state
          env.CURRENT_GAME = JSON.stringify(currentGameState);
          console.log('New game created:', {
            gameId: newGameId,
            answer: normalizedAnswer,
            originalAnswer: record.answer,
            state: newGameState,
            allGames: Object.keys(currentGameState)
          });
          
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
