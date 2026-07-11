import React, { useState } from 'react';
import './ColorConverter.css';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState<string>('');
  const [rgb, setRgb] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  // Функция конвертации HEX в RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    // Убираем решётку, если она есть
    let cleanHex = hex.replace('#', '');

    // Проверяем длину (должно быть 3 или 6 символов)
    if (cleanHex.length === 3) {
      // Преобразуем 3-символьный HEX в 6-символьный
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }

    // Проверяем, что это HEX (только 0-9, A-F)
    const hexRegex = /^[0-9A-F]{6}$/i;
    if (!hexRegex.test(cleanHex)) {
      return null;
    }

    // Конвертируем в RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r, g, b };
  };

  // Обработчик изменения ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    setError('');
    setRgb(null);

    // Ждём ввода всех 7 символов (включая #)
    if (value.length < 7) {
      return;
    }

    // Проверяем, что начинается с #
    if (!value.startsWith('#')) {
      setError('Ошибка!');
      setRgb(null);
      return;
    }

    // Пробуем конвертировать
    const result = hexToRgb(value);

    if (result) {
      const rgbString = `rgb(${result.r}, ${result.g}, ${result.b})`;
      setRgb(rgbString);
      setError('');
      setBackgroundColor(value);
    } else {
      setError('Ошибка!');
      setRgb(null);
      setBackgroundColor('#ffffff');
    }
  };

  return (
    <div className="converter-container" style={{ backgroundColor: backgroundColor }}>
      <div className="converter-card">
        <h2 className="converter-title">Конвертер цветов</h2>

        <div className="input-group">
          <label htmlFor="hex-input" className="input-label">
            Введите цвет в формате HEX:
          </label>
          <input
            id="hex-input"
            type="text"
            value={hex}
            onChange={handleInputChange}
            placeholder="#34495e"
            className={`hex-input ${error ? 'error' : ''}`}
            maxLength={7}
          />
        </div>

        <div className="result-container">
          {rgb && !error && (
            <div className="rgb-result">
              <span className="result-label">RGB:</span>
              <span className="result-value">{rgb}</span>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;