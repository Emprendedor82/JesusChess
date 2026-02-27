import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, X, RotateCcw, HelpCircle } from 'lucide-react';

// Initial board setup
const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

// Piece symbols using Unicode chess characters
const PIECE_SYMBOLS = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

const PIECE_NAMES = {
  'K': 'Rey', 'Q': 'Reina', 'R': 'Torre', 'B': 'Alfil', 'N': 'Caballo', 'P': 'Peón',
  'k': 'Rey', 'q': 'Reina', 'r': 'Torre', 'b': 'Alfil', 'n': 'Caballo', 'p': 'Peón',
};

// Practice exercises for different levels
const PRACTICE_EXERCISES = {
  level1: [
    {
      id: 1,
      title: 'Mueve el Rey',
      description: 'El Rey se mueve una casilla en cualquier dirección',
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'K', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      hint: 'Haz click en el Rey y luego en una casilla adyacente'
    },
    {
      id: 2,
      title: 'Mueve la Torre',
      description: 'La Torre se mueve en línea recta (horizontal o vertical)',
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'R', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      hint: 'La Torre puede moverse a cualquier casilla en su fila o columna'
    },
  ],
  level2: [
    {
      id: 1,
      title: 'Mueve el Alfil',
      description: 'El Alfil se mueve en diagonal',
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'B', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      hint: 'El Alfil solo puede moverse en diagonal'
    },
    {
      id: 2,
      title: 'Mueve el Caballo',
      description: 'El Caballo se mueve en forma de "L"',
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'N', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      hint: 'El Caballo salta en forma de L: 2 casillas + 1 casilla perpendicular'
    },
  ],
  level3: [
    {
      id: 1,
      title: 'Captura la pieza',
      description: 'Usa tu Torre para capturar el peón negro',
      board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'p', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'R', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      targetCapture: { row: 1, col: 4 },
      hint: 'Mueve la Torre a la casilla del peón para capturarlo'
    },
    {
      id: 2,
      title: 'Jaque al Rey',
      description: 'Mueve tu Reina para dar jaque al Rey negro',
      board: [
        [null, null, null, null, 'k', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'Q', null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      hint: 'Coloca tu Reina donde pueda atacar al Rey'
    },
  ],
  level4: [
    {
      id: 1,
      title: 'Mate en 1 (Torre)',
      description: '¡Da jaque mate al Rey negro con tu Torre!',
      board: [
        ['k', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['K', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['R', null, null, null, null, null, null, null],
      ],
      solution: { from: { row: 7, col: 0 }, to: { row: 0, col: 0 } },
      hint: 'Mueve la Torre a la primera fila para dar mate'
    },
    {
      id: 2,
      title: 'Mate en 1 (Reina)',
      description: '¡Da jaque mate al Rey negro con tu Reina!',
      board: [
        [null, null, null, null, null, null, 'k', null],
        [null, null, null, null, null, null, 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 'Q', null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, 'K'],
      ],
      hint: 'La Reina puede dar mate en una casilla específica'
    },
  ],
};

// Check if a move is valid for a given piece
const isValidMove = (piece, fromRow, fromCol, toRow, toCol, board) => {
  if (!piece) return false;
  
  const pieceType = piece.toUpperCase();
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  // Can't capture your own piece
  const targetPiece = board[toRow][toCol];
  if (targetPiece) {
    const isWhitePiece = piece === piece.toUpperCase();
    const isWhiteTarget = targetPiece === targetPiece.toUpperCase();
    if (isWhitePiece === isWhiteTarget) return false;
  }
  
  switch (pieceType) {
    case 'K': // King
      return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);
      
    case 'Q': // Queen
      return isValidRookMove(fromRow, fromCol, toRow, toCol, board) || 
             isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
      
    case 'R': // Rook
      return isValidRookMove(fromRow, fromCol, toRow, toCol, board);
      
    case 'B': // Bishop
      return isValidBishopMove(fromRow, fromCol, toRow, toCol, board);
      
    case 'N': // Knight
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
      
    case 'P': // Pawn
      const isWhite = piece === 'P';
      const direction = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      
      // Forward move
      if (colDiff === 0 && !targetPiece) {
        if (toRow - fromRow === direction) return true;
        if (fromRow === startRow && toRow - fromRow === 2 * direction && !board[fromRow + direction][fromCol]) return true;
      }
      // Capture
      if (colDiff === 1 && toRow - fromRow === direction && targetPiece) return true;
      return false;
      
    default:
      return false;
  }
};

const isValidRookMove = (fromRow, fromCol, toRow, toCol, board) => {
  if (fromRow !== toRow && fromCol !== toCol) return false;
  
  // Check path is clear
  if (fromRow === toRow) {
    const start = Math.min(fromCol, toCol) + 1;
    const end = Math.max(fromCol, toCol);
    for (let c = start; c < end; c++) {
      if (board[fromRow][c]) return false;
    }
  } else {
    const start = Math.min(fromRow, toRow) + 1;
    const end = Math.max(fromRow, toRow);
    for (let r = start; r < end; r++) {
      if (board[r][fromCol]) return false;
    }
  }
  return true;
};

const isValidBishopMove = (fromRow, fromCol, toRow, toCol, board) => {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  if (rowDiff !== colDiff || rowDiff === 0) return false;
  
  // Check path is clear
  const rowDir = toRow > fromRow ? 1 : -1;
  const colDir = toCol > fromCol ? 1 : -1;
  
  for (let i = 1; i < rowDiff; i++) {
    if (board[fromRow + i * rowDir][fromCol + i * colDir]) return false;
  }
  return true;
};

// Get all valid moves for a piece
const getValidMoves = (piece, row, col, board) => {
  const moves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (isValidMove(piece, row, col, r, c, board)) {
        moves.push({ row: r, col: c });
      }
    }
  }
  return moves;
};

// Level names for the indicator
const LEVEL_NAMES = {
  1: 'Rey y Torre',
  2: 'Alfil y Caballo',
  3: 'Capturas y Jaque',
  4: 'Mini Desafíos',
};

const ChessBoard = ({ exercise, onComplete, level }) => {
  const [board, setBoard] = useState(exercise?.board || INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [message, setMessage] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const resetBoard = useCallback(() => {
    setBoard(exercise?.board?.map(r => [...r]) || INITIAL_BOARD.map(r => [...r]));
    setSelectedSquare(null);
    setValidMoves([]);
    setMessage(null);
    setMoveCount(0);
    setShowHint(false);
  }, [exercise]);

  // Bug fix #2: Reset board automatically when exercise or level changes
  useEffect(() => {
    resetBoard();
  }, [exercise, level, resetBoard]);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    
    if (selectedSquare && validMoves.some(m => m.row === row && m.col === col)) {
      const newBoard = board.map(r => [...r]);
      const movingPiece = newBoard[selectedSquare.row][selectedSquare.col];
      
      let finalPiece = movingPiece;
      if (movingPiece === 'P' && row === 0) {
        finalPiece = 'Q';
        setMessage({ type: 'success', text: '¡Promoción! Tu peón es ahora una Reina ♕' });
      } else if (movingPiece === 'p' && row === 7) {
        finalPiece = 'q';
      }
      
      const captured = newBoard[row][col];
      
      newBoard[row][col] = finalPiece;
      newBoard[selectedSquare.row][selectedSquare.col] = null;
      
      setBoard(newBoard);
      setSelectedSquare(null);
      setValidMoves([]);
      setMoveCount(prev => prev + 1);
      
      if (captured) {
        setMessage({ type: 'success', text: `¡Captura! Has tomado ${PIECE_NAMES[captured]} ${PIECE_SYMBOLS[captured]}` });
      } else if (!message || message.type !== 'success') {
        setMessage({ type: 'success', text: '¡Movimiento válido!' });
      }
      
      if (exercise?.targetCapture && row === exercise.targetCapture.row && col === exercise.targetCapture.col) {
        setTimeout(() => {
          setMessage({ type: 'complete', text: '¡Excelente! Has completado el ejercicio' });
          if (onComplete) onComplete();
        }, 500);
      }
      
      return;
    }
    
    if (piece && piece === piece.toUpperCase()) {
      setSelectedSquare({ row, col });
      setValidMoves(getValidMoves(piece, row, col, board));
      setMessage(null);
    } else if (selectedSquare) {
      setMessage({ type: 'error', text: 'Movimiento no permitido' });
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const isLightSquare = (row, col) => (row + col) % 2 === 0;

  return (
    <div className="flex flex-col items-center gap-4" data-testid="chessboard-container">
      {/* Level indicator */}
      {level && (
        <div className="w-full max-w-md" data-testid="level-indicator">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-sm font-bold text-primary">Nivel {level}</span>
            <span className="text-sm text-muted-foreground">–</span>
            <span className="text-sm font-medium text-foreground">{LEVEL_NAMES[level] || ''}</span>
          </div>
        </div>
      )}

      {/* Exercise info */}
      {exercise && (
        <div className="w-full max-w-md text-center" data-testid="exercise-info">
          <h3 className="font-heading text-lg font-bold text-foreground">{exercise.title}</h3>
          <p className="text-sm text-muted-foreground">{exercise.description}</p>
        </div>
      )}

      {/* Chess board - Bug fix #1: rigid grid with absolute-positioned pieces */}
      <div className="relative ml-6 mb-5">
        <div 
          className="grid grid-cols-8 grid-rows-8 border-4 border-primary rounded-lg overflow-hidden shadow-lg"
          style={{ width: 'min(85vw, 380px)', height: 'min(85vw, 380px)' }}
          data-testid="chessboard-grid"
        >
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
              const isValidTarget = validMoves.some(m => m.row === rowIndex && m.col === colIndex);
              const isLight = isLightSquare(rowIndex, colIndex);
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    relative cursor-pointer overflow-hidden
                    ${isLight ? 'bg-amber-100' : 'bg-amber-700'}
                    ${isSelected ? 'ring-4 ring-accent ring-inset' : ''}
                  `}
                  style={{ aspectRatio: '1 / 1' }}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  data-testid={`square-${rowIndex}-${colIndex}`}
                >
                  {/* Piece - absolutely positioned to not affect square size */}
                  {piece && (
                    <span 
                      className={`
                        absolute inset-0 flex items-center justify-center
                        select-none transition-transform leading-none
                        ${piece === piece.toUpperCase() ? 'text-slate-100' : 'text-slate-900'}
                        ${isSelected ? 'scale-110' : 'hover:scale-105'}
                      `}
                      style={{ 
                        fontSize: 'min(5vw, 2rem)',
                        textShadow: piece === piece.toUpperCase() 
                          ? '1px 1px 2px #000, -1px -1px 2px #000' 
                          : 'none' 
                      }}
                      data-testid={`piece-${rowIndex}-${colIndex}`}
                    >
                      {PIECE_SYMBOLS[piece]}
                    </span>
                  )}
                  {/* Valid move dot */}
                  {isValidTarget && !piece && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-accent/50" />
                    </div>
                  )}
                  {/* Capture highlight */}
                  {isValidTarget && piece && (
                    <div className="absolute inset-0 bg-red-500/30" />
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {/* Coordinates */}
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-around text-xs text-muted-foreground font-medium">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(n => <span key={n}>{n}</span>)}
        </div>
        <div className="absolute -bottom-5 left-0 right-0 flex justify-around text-xs text-muted-foreground font-medium">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`
          px-4 py-2 rounded-lg text-sm font-medium animate-fade-in
          ${message.type === 'success' ? 'bg-success/10 text-success' : ''}
          ${message.type === 'error' ? 'bg-destructive/10 text-destructive' : ''}
          ${message.type === 'complete' ? 'bg-xp/10 text-xp' : ''}
        `} data-testid="chess-message">
          {message.text}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 mt-2">
        <Button variant="outline" size="sm" onClick={resetBoard} data-testid="reset-board-btn">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar
        </Button>
        {exercise?.hint && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowHint(!showHint)}
            className="text-muted-foreground"
            data-testid="hint-btn"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Pista
          </Button>
        )}
        <Badge variant="secondary" data-testid="move-counter">
          Movimientos: {moveCount}
        </Badge>
      </div>

      {/* Hint */}
      {showHint && exercise?.hint && (
        <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm text-accent animate-fade-in" data-testid="hint-text">
          {exercise.hint}
        </div>
      )}
    </div>
  );
};

export { ChessBoard, PRACTICE_EXERCISES, PIECE_SYMBOLS, PIECE_NAMES, LEVEL_NAMES };
export default ChessBoard;
