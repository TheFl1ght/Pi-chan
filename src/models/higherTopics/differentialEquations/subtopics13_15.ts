import type { HigherSubtopic } from '../../types';

export const subtopics13_15: HigherSubtopic[] = [
  {
    h: 'Нормальные системы дифференциальных уравнений и первые интегралы',
    f: '\\dot{\\mathbf{x}} = \\mathbf{f}(t, \\mathbf{x}),\\quad \\mathbf{x}(t_0) = \\mathbf{x}_0',
    theory: [
      {
        h: 'Определение нормальной системы ОДУ в координатной и векторной формах',
        kind: 'definition',
        statement: '\\frac{d x_i}{dt} = f_i(t, x_1, x_2, \\dots, x_n),\\quad i=1,\\dots,n \\iff \\frac{d\\mathbf{x}}{dt} = \\mathbf{f}(t, \\mathbf{x})',
        text: 'Нормальной системой дифференциальных уравнений порядка $n$ называется система $n$ уравнений первого порядка, разрешенных относительно производных неизвестных функций $x_1(t), \\dots, x_n(t)$.\n\nВекторная форма: $\\dot{\\mathbf{x}} = \\mathbf{f}(t, \\mathbf{x})$, где $\\mathbf{x} = (x_1, \\dots, x_n)^T \\in \\mathbb{R}^n$ — вектор фазовых координат, а $\\mathbf{f} = (f_1, \\dots, f_n)^T$ — векторное поле скоростей в фазовом пространстве.\n\nПространство $\\mathbb{R}_t \\times \\mathbb{R}_x^n$ называется расширенным фазовым пространством, а траектория движения точки $\\mathbf{x}(t)$ в $\\mathbb{R}^n$ называется фазовой траекторией.',
      },
      {
        h: 'Теорема об эквивалентности уравнения n-го порядка и нормальной системы',
        kind: 'theorem',
        theorem: true,
        statement: 'y^{(n)} = F(t, y, y\', \\dots, y^{(n-1)}) \\iff \\begin{cases} \\dot{x}_1 = x_2 \\\\ \\dot{x}_2 = x_3 \\\\ \\dots \\\\ \\dot{x}_n = F(t, x_1, x_2, \\dots, x_n) \\end{cases}',
        text: 'Любое скалярное дифференциальное уравнение порядка $n$, разрешенное относительно старшей производной, эквивалентно нормальной системе из $n$ уравнений первого порядка.',
        proof: 'Введем новые переменные:\n$$x_1(t) = y(t),\\quad x_2(t) = y\'(t),\\quad x_3(t) = y\'\'(t),\\quad \\dots,\\quad x_n(t) = y^{(n-1)}(t).$$\nДифференцируя эти соотношения по $t$:\n$$\\dot{x}_1 = y\' = x_2,$$\n$$\\dot{x}_2 = y\'\' = x_3,$$\n$$\\dots$$\n$$\\dot{x}_{n-1} = y^{(n-1)} = x_n,$$\n$$\\dot{x}_n = y^{(n)} = F(t, y, y\', \\dots, y^{(n-1)}) = F(t, x_1, x_2, \\dots, x_n).$$\nПолучили нормальную систему $n$ уравнений. Обратно, если $(x_1, \\dots, x_n)$ — решение системы, то первая компонента $y(t) = x_1(t)$ $n$ раз дифференцируема и удовлетворяет исходному уравнению.',
      },
      {
        h: 'Первые интегралы дифференциальной системы',
        kind: 'definition',
        statement: '\\psi(t, \\mathbf{x}) = C \\iff \\frac{\\partial\\psi}{\\partial t} + \\sum_{i=1}^n \\frac{\\partial\\psi}{\\partial x_i} f_i(t, \\mathbf{x}) \\equiv 0',
        text: 'Функция $\\psi(t, \\mathbf{x})$ называется первым интегралом нормальной системы $\\dot{\\mathbf{x}} = \\mathbf{f}(t, \\mathbf{x})$, если она принимает постоянное значение вдоль любой интегральной кривой системы: $\\psi(t, \\mathbf{x}(t)) = \\text{const}$.\n\nГеометрически каждый первый интеграл $\\psi(t, \\mathbf{x}) = C$ задает гиперповерхность в расширенном фазовом пространстве, на которой целиком лежат фазовые траектории. Знание $k$ функционально независимых первых интегралов позволяет понизить порядок системы на $k$ единиц, а знание $n$ независимых интегралов дает полный общий интеграл системы.',
      },
    ],
    practice: [
      {
        group: 'Метод исключения неизвестных',
        problems: [
          {
            h: 'Сведение системы к одному уравнению 2-го порядка',
            problem: 'Решить систему дифференциальных уравнений $\\begin{cases} \\dot{x} = 2x + y \\\\ \\dot{y} = 3x + 4y \\end{cases}$.',
            steps: [
              '1. Выразим переменную $y$ из первого уравнения:\n$$y = \\dot{x} - 2x.$$',
              '2. Продифференцируем по $t$:\n$$\\dot{y} = \\ddot{x} - 2\\dot{x}.$$',
              '3. Подставим выражения для $y$ и $\\dot{y}$ во второе уравнение системы:\n$$\\ddot{x} - 2\\dot{x} = 3x + 4(\\dot{x} - 2x) = 3x + 4\\dot{x} - 8x = 4\\dot{x} - 5x.$$',
              '4. Перенесем все члены влево, получив линейное уравнение 2-го порядка для $x(t)$:\n$$\\ddot{x} - 6\\dot{x} + 5x = 0.$$',
              '5. Характеристическое уравнение: $\\lambda^2 - 6\\lambda + 5 = 0 \\implies (\\lambda - 1)(\\lambda - 5) = 0 \\implies \\lambda_1 = 1,\\ \\lambda_2 = 5$.\nОбщее решение для $x(t)$:\n$$x(t) = C_1 e^t + C_2 e^{5t}.$$',
              '6. Находим $y(t) = \\dot{x} - 2x$:\n$$\\dot{x}(t) = C_1 e^t + 5C_2 e^{5t} \\implies y(t) = (C_1 e^t + 5C_2 e^{5t}) - 2(C_1 e^t + C_2 e^{5t}) = -C_1 e^t + 3C_2 e^{5t}.$$',
              '7. Общее решение системы:\n$$\\begin{cases} x(t) = C_1 e^t + C_2 e^{5t} \\\\ y(t) = -C_1 e^t + 3C_2 e^{5t} \\end{cases}$$',
            ],
          },
        ],
      },
    ],
  },
  {
    h: 'Линейные однородные системы с постоянными коэффициентами: матричный метод',
    f: '\\dot{\\mathbf{x}} = A \\mathbf{x},\\quad \\mathbf{x}(t) = e^{At}\\mathbf{x}_0',
    theory: [
      {
        h: 'Векторно-матричная форма и матричная экспонента',
        kind: 'definition',
        statement: '\\dot{\\mathbf{x}} = A \\mathbf{x},\\quad e^{At} = \\sum_{k=0}^\\infty \\frac{(At)^k}{k!} = E + At + \\frac{A^2 t^2}{2!} + \\dots',
        text: 'Линейная однородная система с постоянной матрицей $A \\in \\mathbb{R}^{n\\times n}$ записывается как $\\dot{\\mathbf{x}} = A \\mathbf{x}$.\n\nМатричный ряд для матричной экспоненты $e^{At}$ сходится абсолютно и равномерно на любом компакте $t \\in [-T, T]$. Матричная экспонента удовлетворяет матричному дифференциальному уравнению $\\frac{d}{dt} e^{At} = A e^{At} = e^{At} A$ и начальному условию $e^{A\\cdot 0} = E$.\n\nРешение задачи Коши $\\dot{\\mathbf{x}} = A\\mathbf{x}, \\mathbf{x}(0) = \\mathbf{x}_0$ дается фундаментальной формулой:\n$$\\mathbf{x}(t) = e^{At} \\mathbf{x}_0.$$',
      },
      {
        h: 'Метод Эйлера (собственные значения и собственные векторы)',
        kind: 'theorem',
        theorem: true,
        statement: 'A\\mathbf{v} = \\lambda\\mathbf{v},\\ \\mathbf{v} \\ne 0 \\implies \\mathbf{x}(t) = e^{\\lambda t}\\mathbf{v}',
        text: 'Если матрица $A$ имеет собственный вектор $\\mathbf{v}$ с собственным значением $\\lambda$, то вектор-функция $\\mathbf{x}(t) = e^{\\lambda t}\\mathbf{v}$ является решением системы $\\dot{\\mathbf{x}} = A\\mathbf{x}$. Если матрица диагонализируема (имеет $n$ линейно независимых собственных векторов $\\mathbf{v}_1, \\dots, \\mathbf{v}_n$), общее решение имеет вид:\n$$\\mathbf{x}(t) = \\sum_{i=1}^n C_i e^{\\lambda_i t} \\mathbf{v}_i.$$',
        proof: 'Вычислим производную функции $\\mathbf{x}(t) = e^{\\lambda t}\\mathbf{v}$ по переменной $t$:\n$$\\dot{\\mathbf{x}}(t) = \\frac{d}{dt}(e^{\\lambda t}\\mathbf{v}) = \\lambda e^{\\lambda t} \\mathbf{v}.$$\nС другой стороны, умножим матрицу $A$ на вектор $\\mathbf{x}(t)$:\n$$A \\mathbf{x}(t) = A (e^{\\lambda t}\\mathbf{v}) = e^{\\lambda t} (A \\mathbf{v}).$$\nТак как $\\mathbf{v}$ — собственный вектор матрицы $A$, $A\\mathbf{v} = \\lambda \\mathbf{v}$, следовательно:\n$$A \\mathbf{x}(t) = e^{\\lambda t} (\\lambda \\mathbf{v}) = \\lambda e^{\\lambda t} \\mathbf{v} = \\dot{\\mathbf{x}}(t).$$\nРавенство тождественно выполнено при всех $t$. Линейная независимость решений следует из линейной независимости собственных векторов при $t = 0$: $W(0) = \\det(\\mathbf{v}_1, \\dots, \\mathbf{v}_n) \\ne 0$.',
      },
      {
        h: 'Кратные корни и жордановы цепочки корневых векторов',
        kind: 'theorem',
        theorem: true,
        statement: '(A - \\lambda E)\\mathbf{h}_1 = 0,\\quad (A - \\lambda E)\\mathbf{h}_2 = \\mathbf{h}_1 \\implies \\mathbf{x}(t) = e^{\\lambda t}(\\mathbf{h}_2 + t\\mathbf{h}_1)',
        text: 'Если геометрическая кратность собственного значения меньше его алгебраической кратности, недостающие решения строятся по цепочкам присоединенных (корневых) векторов длины $m$:\n$$(A - \\lambda E)\\mathbf{h}_1 = 0,\\quad (A - \\lambda E)\\mathbf{h}_2 = \\mathbf{h}_1,\\quad \\dots,\\quad (A - \\lambda E)\\mathbf{h}_m = \\mathbf{h}_{m-1}.$$',
        proof: 'Используем формулу $e^{At} = e^{\\lambda E t + (A - \\lambda E)t} = e^{\\lambda t} e^{(A - \\lambda E)t}$. Действуя на корневой вектор $\\mathbf{h}_2$, для которого $(A - \\lambda E)^2 \\mathbf{h}_2 = 0$:\n$$\\mathbf{x}(t) = e^{At}\\mathbf{h}_2 = e^{\\lambda t}\\left(E + t(A - \\lambda E) + \\frac{t^2}{2!}(A - \\lambda E)^2 + \\dots\\right)\\mathbf{h}_2 = e^{\\lambda t}(\\mathbf{h}_2 + t(A - \\lambda E)\\mathbf{h}_2) = e^{\\lambda t}(\\mathbf{h}_2 + t\\mathbf{h}_1).$$\nДифференцируя: $\\dot{\\mathbf{x}}(t) = \\lambda e^{\\lambda t}(\\mathbf{h}_2 + t\\mathbf{h}_1) + e^{\\lambda t}\\mathbf{h}_1 = e^{\\lambda t}(\\lambda\\mathbf{h}_2 + \\mathbf{h}_1 + \\lambda t\\mathbf{h}_1)$.\nС другой стороны: $A \\mathbf{x}(t) = e^{\\lambda t}(A\\mathbf{h}_2 + t A\\mathbf{h}_1) = e^{\\lambda t}((\\lambda\\mathbf{h}_2 + \\mathbf{h}_1) + t\\lambda\\mathbf{h}_1) = \\dot{\\mathbf{x}}(t)$. Тождество доказано.',
      },
    ],
    practice: [
      {
        group: 'Матричный метод решения систем',
        problems: [
          {
            h: 'Система 2×2 с различными вещественными собственными значениями',
            problem: 'Решить систему матричным методом: $\\dot{\\mathbf{x}} = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}\\mathbf{x}$.',
            steps: [
              '1. Составим характеристическое уравнение:\n$$\\det(A - \\lambda E) = \\det\\begin{pmatrix} 1 - \\lambda & 2 \\\\ 2 & 1 - \\lambda \\end{pmatrix} = (1 - \\lambda)^2 - 4 = \\lambda^2 - 2\\lambda - 3 = 0.$$',
              '2. Корни уравнения: $\\lambda_1 = 3,\\ \\lambda_2 = -1$.',
              '3. Найдем собственный вектор для $\\lambda_1 = 3$:\n$$(A - 3E)\\mathbf{v}_1 = \\begin{pmatrix} -2 & 2 \\\\ 2 & -2 \\end{pmatrix}\\begin{pmatrix} v_{11} \\\\ v_{12} \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies -2v_{11} + 2v_{12} = 0 \\implies \\mathbf{v}_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}.$$',
              '4. Найдем собственный вектор для $\\lambda_2 = -1$:\n$$(A - (-1)E)\\mathbf{v}_2 = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix}\\begin{pmatrix} v_{21} \\\\ v_{22} \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies 2v_{21} + 2v_{22} = 0 \\implies \\mathbf{v}_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}.$$',
              '5. Запишем общее решение в векторном виде:\n$$\\mathbf{x}(t) = C_1 e^{3t} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + C_2 e^{-t} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} C_1 e^{3t} + C_2 e^{-t} \\\\ C_1 e^{3t} - C_2 e^{-t} \\end{pmatrix}.$$',
            ],
          },
        ],
      },
    ],
  },
  {
    h: 'Линейные неоднородные системы: формула Коши и вариация постоянных',
    f: '\\dot{\\mathbf{x}} = A(t)\\mathbf{x} + \\mathbf{f}(t),\\quad \\mathbf{x}(t) = \\Phi(t)\\Phi^{-1}(t_0)\\mathbf{x}_0 + \\int_{t_0}^t \\Phi(t)\\Phi^{-1}(s)\\mathbf{f}(s)\\,ds',
    theory: [
      {
        h: 'Фундаментальная матрица системы и формула Лиувилля — Якоби',
        kind: 'theorem',
        theorem: true,
        statement: '\\det\\Phi(t) = \\det\\Phi(t_0) \\exp\\left(\\int_{t_0}^t \\operatorname{tr} A(s)\\,ds\\right)',
        text: 'Матрица $\\Phi(t) = (\\mathbf{x}_1(t), \\dots, \\mathbf{x}_n(t))$, составленная из $n$ столбцов фундаментальной системы решений уравнения $\\dot{\\mathbf{x}} = A(t)\\mathbf{x}$, называется фундаментальной матрицей системы. Ее определитель равен вронскиану $W(t) = \\det\\Phi(t)$ и удовлетворяет формуле Лиувилля — Якоби.',
        proof: 'Дифференцируя определитель матрицы $\\Phi(t)$ по строкам и учитывая матричное соотношение $\\dot{\\Phi}(t) = A(t) \\Phi(t)$, получаем формулу для производной вронскиана:\n$$W\'(t) = \\operatorname{tr}(A(t)) W(t) \\implies \\frac{dW}{W} = \\operatorname{tr}(A(t))\\,dt.$$\nИнтегрируя это уравнение с разделяющимися переменными в пределах от $t_0$ до $t$, получаем:\n$$\\ln\\frac{W(t)}{W(t_0)} = \\int_{t_0}^t \\operatorname{tr}(A(s))\\,ds \\implies W(t) = W(t_0) \\exp\\left(\\int_{t_0}^t \\operatorname{tr} A(s)\\,ds\\right).$$',
      },
      {
        h: 'Метод вариации произвольных постоянных в векторной форме',
        kind: 'theorem',
        theorem: true,
        statement: '\\mathbf{x}(t) = \\Phi(t) \\mathbf{c}(t) \\implies \\Phi(t) \\dot{\\mathbf{c}}(t) = \\mathbf{f}(t) \\implies \\dot{\\mathbf{c}}(t) = \\Phi^{-1}(t)\\mathbf{f}(t)',
        text: 'Частное решение линейной неоднородной системы $\\dot{\\mathbf{x}} = A(t)\\mathbf{x} + \\mathbf{f}(t)$ находится методом вариации вектора произвольных постоянных $\\mathbf{c}(t) = \\int \\Phi^{-1}(t)\\mathbf{f}(t)\\,dt$.',
        proof: 'Ищем решение в виде $\\mathbf{x}(t) = \\Phi(t) \\mathbf{c}(t)$. Дифференцируем по правилу Лейбница:\n$$\\dot{\\mathbf{x}}(t) = \\dot{\\Phi}(t) \\mathbf{c}(t) + \\Phi(t) \\dot{\\mathbf{c}}(t).$$\nПодставим это выражение в неоднородную систему $\\dot{\\mathbf{x}} = A(t)\\mathbf{x} + \\mathbf{f}(t)$:\n$$\\dot{\\Phi}(t) \\mathbf{c}(t) + \\Phi(t) \\dot{\\mathbf{c}}(t) = A(t) \\Phi(t) \\mathbf{c}(t) + \\mathbf{f}(t).$$\nПоскольку $\\Phi(t)$ — фундаментальная матрица однородной системы, выполнено $\\dot{\\Phi}(t) = A(t)\\Phi(t)$. Первое слагаемое слева уничтожается с первым слагаемым справа:\n$$\\Phi(t) \\dot{\\mathbf{c}}(t) = \\mathbf{f}(t).$$\nТак как столбцы $\\Phi(t)$ образуют ФСР, матрица $\\Phi(t)$ невырождена ($\\det\\Phi(t) \\ne 0$). Умножая слева на обратную матрицу $\\Phi^{-1}(t)$:\n$$\\dot{\\mathbf{c}}(t) = \\Phi^{-1}(t) \\mathbf{f}(t) \\implies \\mathbf{c}(t) = \\mathbf{c}_0 + \\int_{t_0}^t \\Phi^{-1}(s)\\mathbf{f}(s)\\,ds.$$\nУмножая на $\\Phi(t)$, получаем решение задачи Коши.',
      },
      {
        h: 'Формула Коши для задачи Коши',
        kind: 'theorem',
        theorem: true,
        statement: '\\mathbf{x}(t) = K(t, t_0)\\mathbf{x}_0 + \\int_{t_0}^t K(t, s)\\mathbf{f}(s)\\,ds,\\quad K(t, s) = \\Phi(t)\\Phi^{-1}(s)',
        text: 'Матрица $K(t, s) = \\Phi(t)\\Phi^{-1}(s)$ называется разрешающей матрицей (матрицей Коши или матрицантом). При постоянной матрице $A$ матрица Коши зависит только от разности аргументов: $K(t, s) = e^{A(t-s)}$.',
      },
    ],
    practice: [
      {
        group: 'Неоднородные системы',
        problems: [
          {
            h: 'Решение неоднородной системы 2×2',
            problem: 'Решить задачу Коши: $\\dot{\\mathbf{x}} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\mathbf{x} + \\begin{pmatrix} 0 \\\\ \\cos t \\end{pmatrix},\\ \\mathbf{x}(0) = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$.',
            steps: [
              '1. Найдем фундаментальную матрицу однородной системы $\\dot{\\mathbf{x}} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\mathbf{x}$.\nХарактеристическое уравнение: $\\lambda^2 + 1 = 0 \\implies \\lambda = \\pm i$.\nРешения: $x_1 = \\cos t,\\ x_2 = -\\sin t$ (первый столбец); $x_1 = \\sin t,\\ x_2 = \\cos t$ (второй столбец).\n$$\\Phi(t) = \\begin{pmatrix} \\cos t & \\sin t \\\\ -\\sin t & \\cos t \\end{pmatrix},\\quad \\det\\Phi(t) = \\cos^2 t + \\sin^2 t = 1.$$',
              '2. Найдем обратную матрицу $\\Phi^{-1}(t)$:\n$$\\Phi^{-1}(t) = \\begin{pmatrix} \\cos t & -\\sin t \\\\ \\sin t & \\cos t \\end{pmatrix}.$$',
              '3. Вычислим произведение $\\Phi^{-1}(t) \\mathbf{f}(t)$:\n$$\\Phi^{-1}(t) \\mathbf{f}(t) = \\begin{pmatrix} \\cos t & -\\sin t \\\\ \\sin t & \\cos t \\end{pmatrix} \\begin{pmatrix} 0 \\\\ \\cos t \\end{pmatrix} = \\begin{pmatrix} -\\sin t \\cos t \\\\ \\cos^2 t \\end{pmatrix} = \\begin{pmatrix} -\\frac{1}{2}\\sin 2t \\\\ \\frac{1 + \\cos 2t}{2} \\end{pmatrix}.$$',
              '4. Интегрируем от $0$ до $t$:\n$$\\int_0^t \\begin{pmatrix} -\\frac{1}{2}\\sin 2s \\\\ \\frac{1 + \\cos 2s}{2} \\end{pmatrix} ds = \\begin{pmatrix} \\left[\\frac{1}{4}\\cos 2s\\right]_0^t \\\\ \\left[\\frac{s}{2} + \\frac{1}{4}\\sin 2s\\right]_0^t \\end{pmatrix} = \\begin{pmatrix} \\frac{1}{4}(\\cos 2t - 1) \\\\ \\frac{t}{2} + \\frac{1}{4}\\sin 2t \\end{pmatrix}.$$',
              '5. Прибавим начальный вектор с учетом $\\Phi(0) = E$: $\\mathbf{x}_0 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$.\nУмножая матрицу $\\Phi(t)$ на полученный вектор, находим частное решение:\n$$x_1(t) = \\cos t + \\frac{1}{2} t \\sin t,$$\n$$x_2(t) = -\\sin t + \\frac{1}{2}\\sin t + \\frac{1}{2} t \\cos t = -\\frac{1}{2}\\sin t + \\frac{1}{2} t \\cos t.$$',
            ],
          },
        ],
      },
    ],
  },
];
