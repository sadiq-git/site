import React, { useState, useRef, useEffect } from 'react';

const commands = {
  help: {
    description: 'List available commands',
    fn: () =>
      'Available commands:\n' +
      Object.keys(commands).map(cmd => `- ${cmd}: ${commands[cmd].description}`).join('\n'),
  },
  whoami: {
    description: 'Show current user',
    fn: () => 'devops@webterminal',
  },
  date: {
    description: 'Show current date and time',
    fn: () => new Date().toString(),
  },
  clear: {
    description: 'Clear terminal',
    fn: (_, setLines) => setLines([]),
  },
};

export default function Terminal() {
  const [lines, setLines] = useState([
    'Welcome to DevOps Web Terminal!',
    "Type 'help' to list commands.",
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  function handleCommand(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const [cmd, ...args] = input.trim().split(' ');
    setLines(l => [...l, `$ ${input}`]);
    if (commands[cmd]) {
      if (cmd === 'clear') {
        commands[cmd].fn(args, setLines);
      } else {
        setLines(l => [...l, commands[cmd].fn(args)]);
      }
    } else {
      setLines(l => [...l, `Command not found: ${cmd}`]);
    }
    setInput('');
  }

  return (
    <div 
      style={{
        background: '#222',
        color: '#eee',
        fontFamily: 'monospace',
        padding: 16,
        width: '100%',
        height: '80vh',
        borderRadius: 8,
        overflowY: 'auto',
      }}
      onClick={() => inputRef.current.focus()}
    >
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      <form onSubmit={handleCommand} style={{ display: 'flex' }}>
        <span style={{ color: '#00ff00' }}>$</span>
        <input
          ref={inputRef}
          style={{
            background: 'transparent',
            color: '#eee',
            border: 'none',
            fontFamily: 'monospace',
            flex: 1,
            outline: 'none',
            fontSize: 16,
          }}
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}
