// Game data
const sportsRecords = [
  {
    answer: "adrian peterson",
    question: "Who had the most rushing yards in the 2012 NFL season?",
    clues: [
      "I rushed for the most yards in the 2012 NFL season",
      "I played for the Minnesota Vikings",
      "I was named NFL MVP this year",
      "I finished with 2,097 rushing yards",
      "🏈 I averaged 6.0 yards per carry and came back from an ACL injury"
    ]
  },
  // Copy all other records from server.js here
];

// Players list (copy from server.js)
const players = [
  // Copy all players from server.js here
];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Initialize game state
let currentGame = null;

export default {
  async fetch(request, env, ctx) {
    // Initialize game if not exists
    if (!currentGame) {
      currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];
    }
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);
    const path = url.pathname.split('/').pop();

    try {
      switch (path) {
        case 'clue': {
          const attempt = parseInt(url.searchParams.get('attempt'));
          if (attempt >= 0 && attempt < currentGame.clues.length) {
            return new Response(
              JSON.stringify({
                clue: currentGame.clues[attempt],
                question: currentGame.question
              }),
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
          const correct = guess.toLowerCase() === currentGame.answer.toLowerCase();
          return new Response(
            JSON.stringify({ correct }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'new-game': {
          currentGame = sportsRecords[Math.floor(Math.random() * sportsRecords.length)];
          return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        case 'players/search': {
          const query = url.searchParams.get('q').toLowerCase();
          const matches = players
            .filter(player => player.toLowerCase().includes(query))
            .sort((a, b) => {
              const aStartsWith = a.toLowerCase().startsWith(query);
              const bStartsWith = b.toLowerCase().startsWith(query);
              if (aStartsWith && !bStartsWith) return -1;
              if (!aStartsWith && bStartsWith) return 1;
              return a.localeCompare(b);
            })
            .slice(0, 10);
          return new Response(
            JSON.stringify({ matches }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
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
