import type { MathBoards } from './types';
import { SCHOOL_GRADES } from './schoolGrades';

export const MATH_BOARDS: MathBoards = {
  school: {
    slug:'школьная', accent:'var(--chalk-blue)',
    title:'Школьная математика',
    desc:'Материал сгруппирован по ступеням обучения — раскрывай класс, чтобы увидеть темы.',
    grades: SCHOOL_GRADES,
  },
  olympiad: {
    slug:'олимпиадная', accent:'var(--chalk-pink)',
    title:'Олимпиадная математика',
    desc:'Методы и идеи, которые не входят в школьную программу, но решают всё на олимпиаде.',
    topics:[
      {t:'Принцип Дирихле', f:'n+1 → n'},
      {t:'Инварианты и раскраски', f:'чёрное ≠ белое'},
      {t:'Теория чисел', f:'gcd(a,b)'},
      {t:'Комбинаторная геометрия', f:'∠, выпуклость'},
      {t:'Неравенства', f:'AM ≥ GM'},
      {t:'Функциональные уравнения', f:'f(x+y)=f(x)+f(y)'},
      {t:'Графы и деревья', f:'V−E+F=2'},
      {t:'Индукция', f:'P(n)→P(n+1)'},
      {t:'Многочлены', f:'aₙxⁿ+…+a₀'},
      {t:'Игры и стратегии', f:'первый ход = победа?'},
    ]
  },
  higher: {
    slug:'высшая', accent:'var(--chalk-yellow)',
    title:'Высшая математика',
    desc:'Университетский курс: анализ, алгебра и всё, что начинается там, где заканчивается школа.',
    topics:[
      {t:'Математический анализ', f:'\\int f(x)\\,dx', status:'dev'},
      {t:'Линейная алгебра', f:'Ax=\\lambda x', status:'dev'},
      {t:'Дифференциальные уравнения', f:"y'=ky", status:'dev'},
      {t:'Теория вероятностей и матстатистика', f:'P(A|B)', status:'soon'},
      {t:'Дискретная математика', f:'2^n', status:'soon'},
      {t:'Комплексный анализ', f:'e^{i\\pi}+1=0', status:'soon'},
      {t:'Топология', f:'X\\cong Y', status:'soon'},
      {t:'Функциональный анализ', f:'\\|x\\|', status:'dev'},
      {t:'Численные методы', f:"x_{n+1}=x_n-\\frac{f}{f'}", status:'soon'},
      {t:'Дифференциальная геометрия', f:'\\kappa', status:'soon'},
      {t:'Абстрактная алгебра', f:'(G,\\circ,e)', status:'soon'},
      {t:'Математическая логика', f:'\\forall,\\exists,\\vdash', status:'soon'},
      {t:'Теория меры и интеграл Лебега', f:'\\mu(A)', status:'soon'},
      {t:'Вариационное исчисление', f:'\\delta J=0', status:'soon'},
      {t:'Уравнения математической физики', f:'\\Delta u=f', status:'soon'},
      {t:'Теория игр', f:'v(G)', status:'soon'},
      {t:'Методы оптимизации', f:'\\nabla f=0', status:'soon'},
      {t:'Тензорный анализ', f:'T_{ij}', status:'soon'},
      {t:'Аналитическая теория чисел', f:'\\pi(x)\\sim\\frac{x}{\\ln x}', status:'soon'},
      {t:'Ряды Фурье', f:'a_n,\\,b_n', status:'soon'},
      {t:'Теория представлений', f:'\\rho:G\\to GL(V)', status:'soon'},
      {t:'Алгебраическая топология', f:'\\pi_1(X)', status:'soon'},
    ]
  }
};
