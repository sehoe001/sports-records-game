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
  // Harder MLB Records
  {
    answer: findExactPlayer("Joe DiMaggio"),
    question: "Who holds the MLB record with a 56-game hitting streak in 1941?",
    clues: [
      "This record has stood for over 80 years",
      "I played my entire career for the New York Yankees",
      "My streak lasted from May 15 to July 16",
      "I was nicknamed 'The Yankee Clipper'",
      "⚾ I hit .408 during this historic streak"
    ]
  },
  {
    answer: findExactPlayer("Sandy Koufax"),
    question: "Who threw 4 no-hitters in a 4-year span from 1962-1965?",
    clues: [
      "I was the first MLB pitcher to throw 4 no-hitters",
      "My last no-hitter was a perfect game",
      "I played my entire career for the Dodgers",
      "I was the youngest player elected to the Hall of Fame",
      "⚾ I retired at age 30 due to arthritis"
    ]
  },
  // Harder NBA Records
  {
    answer: findExactPlayer("Wilt Chamberlain"),
    question: "Who averaged 48.53 minutes per game in the 1961-62 NBA season?",
    clues: [
      "I played more minutes than were available in regulation games",
      "I played every minute of every game, including overtime",
      "This was the same season I averaged 50.4 points per game",
      "I played for the Philadelphia Warriors",
      "🏀 This record will likely never be broken"
    ]
  },
  {
    answer: findExactPlayer("Bill Russell"),
    question: "Who grabbed 51 rebounds in a single NBA game in 1960?",
    clues: [
      "I set this record against Syracuse on February 5",
      "I was playing for the Boston Celtics",
      "I averaged 24.7 rebounds per game that season",
      "I won the MVP award that year",
      "🏀 I won 11 championships in my career"
    ]
  },
  // Harder NFL Records
  {
    answer: findExactPlayer("Jerry Rice"),
    question: "Who holds the NFL record of 208 consecutive games with a reception?",
    clues: [
      "This streak spanned from 1985 to 2004",
      "I played primarily for the San Francisco 49ers",
      "I'm considered the greatest receiver of all time",
      "I was selected to the Pro Bowl 13 times",
      "🏈 I scored 208 career touchdowns"
    ]
  },
  {
    answer: findExactPlayer("Brett Favre"),
    question: "Who started 297 consecutive regular season games at quarterback?",
    clues: [
      "This streak lasted from 1992 to 2010",
      "I played most of my career for the Green Bay Packers",
      "I won three consecutive NFL MVP awards",
      "I was known for my ironman streak",
      "🏈 I threw 508 career touchdown passes"
    ]
  },
  // International Soccer Records
  {
    answer: findExactPlayer("Pele"),
    question: "Who scored 1,279 goals in 1,363 games, a Guinness World Record?",
    clues: [
      "I played primarily for Santos in Brazil",
      "I won three World Cups with Brazil",
      "I scored my 1000th goal on a penalty kick",
      "I was named FIFA Player of the Century",
      "⚽ I was nicknamed 'O Rei' (The King)"
    ]
  },
  {
    answer: findExactPlayer("Cristiano Ronaldo"),
    question: "Who holds the record for most international goals in men's soccer?",
    clues: [
      "I've scored over 120 goals for my national team",
      "I've played in 5 World Cups",
      "I've won 5 Champions League titles",
      "I play for Portugal",
      "⚽ I'm known for my 'SIU' celebration"
    ]
  },
  // Tennis Records
  {
    answer: findExactPlayer("Serena Williams"),
    question: "Who won 23 Grand Slam singles titles in the Open Era?",
    clues: [
      "I won my first Grand Slam in 1999",
      "I completed two 'Serena Slams'",
      "I won four Olympic gold medals",
      "I won my last major while pregnant",
      "🎾 I'm considered the greatest female tennis player ever"
    ]
  },
  // Track Records
  {
    answer: findExactPlayer("Usain Bolt"),
    question: "Who holds the 100m world record of 9.58 seconds?",
    clues: [
      "I set this record in Berlin in 2009",
      "I'm from Jamaica",
      "I won 8 Olympic gold medals",
      "I'm nicknamed 'Lightning Bolt'",
      "🏃 I'm known for my 'lightning bolt' pose"
    ]
  },
  {
    answer: findExactPlayer("Wilt Chamberlain"),
    question: "Who averaged 48.53 minutes per game in the 1961-62 NBA season?",
    clues: [
      "I played more minutes than were available in regulation games",
      "I played every minute of every game, including overtime",
      "This was the same season I averaged 50.4 points per game",
      "I played for the Philadelphia Warriors",
      "🏀 This record will likely never be broken"
    ]
  },
  {
    answer: findExactPlayer("Bill Russell"),
    question: "Who grabbed 51 rebounds in a single NBA game in 1960?",
    clues: [
      "I set this record against Syracuse on February 5",
      "I was playing for the Boston Celtics",
      "I averaged 24.7 rebounds per game that season",
      "I won the MVP award that year",
      "🏀 I won 11 championships in my career"
    ]
  },
  // Harder NFL Records
  {
    answer: findExactPlayer("Jerry Rice"),
    question: "Who holds the NFL record of 208 consecutive games with a reception?",
    clues: [
      "This streak spanned from 1985 to 2004",
      "I played primarily for the San Francisco 49ers",
      "I'm considered the greatest receiver of all time",
      "I was selected to the Pro Bowl 13 times",
      "🏈 I scored 208 career touchdowns"
    ]
  },
  {
    answer: findExactPlayer("Brett Favre"),
    question: "Who started 297 consecutive regular season games at quarterback?",
    clues: [
      "This streak lasted from 1992 to 2010",
      "I played most of my career for the Green Bay Packers",
      "I won three consecutive NFL MVP awards",
      "I was known for my ironman streak",
      "🏈 I threw 508 career touchdown passes"
    ]
  },
  // International Soccer Records
  {
    answer: findExactPlayer("Pele"),
    question: "Who scored 1,279 goals in 1,363 games, a Guinness World Record?",
    clues: [
      "I played primarily for Santos in Brazil",
      "I won three World Cups with Brazil",
      "I scored my 1000th goal on a penalty kick",
      "I was named FIFA Player of the Century",
      "⚽ I was nicknamed 'O Rei' (The King)"
    ]
  },
  {
    answer: findExactPlayer("Cristiano Ronaldo"),
    question: "Who holds the record for most international goals in men's soccer?",
    clues: [
      "I've scored over 120 goals for my national team",
      "I've played in 5 World Cups",
      "I've won 5 Champions League titles",
      "I play for Portugal",
      "⚽ I'm known for my 'SIU' celebration"
    ]
  },
  // Tennis Records
  {
    answer: findExactPlayer("Serena Williams"),
    question: "Who won 23 Grand Slam singles titles in the Open Era?",
    clues: [
      "I won my first Grand Slam in 1999",
      "I completed two 'Serena Slams'",
      "I won four Olympic gold medals",
      "I won my last major while pregnant",
      "🎾 I'm considered the greatest female tennis player ever"
    ]
  },
  // Track Records
  {
    answer: findExactPlayer("Usain Bolt"),
    question: "Who holds the 100m world record of 9.58 seconds?",
    clues: [
      "I set this record in Berlin in 2009",
      "I'm from Jamaica",
      "I won 8 Olympic gold medals",
      "I'm nicknamed 'Lightning Bolt'",
      "🏃 I'm known for my 'lightning bolt' pose"
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
          const requestBody = await request.json();
          const { guess } = requestBody;
          const gameId = requestBody.gameId;
          
          if (!guess) {
            return new Response(
              JSON.stringify({ error: 'No guess provided' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
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
