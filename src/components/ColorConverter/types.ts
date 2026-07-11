export interface ColorState {
  hex: string;           // Текущее значение HEX
  rgb: string | null;    // Результат конвертации (или null при ошибке)
  error: string;         // Сообщение об ошибке
  backgroundColor: string; // Цвет фона
}