import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '@#$&*';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-xl shadow-2xl w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-orange-400 text-center">🔐 Password Generator</h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            
            className="flex-grow bg-gray-800 text-orange-300 p-2 rounded outline-none"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            style={{ cursor: 'pointer' }}
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="length" className="block mb-1 text-orange-300">
              Length: {length}
            </label>
            <input
              type="range"
              id="length"
              min={8}
              max={20}
              value={length}
              readOnly
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              <span>Include Numbers</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              <span>Include Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
