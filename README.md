# Distance-Transformation-Algorithm

# Context
This was a code challenge for Dott (2021).

# Task
Read in a bitmap from standard input, apply distance transformation, and write the resulting distance map to standard output.

# Criteria
This task had to be completed in TypeScript.

# Planned approach
1. Write the code logic based on the C/C++ approach I'm familiar with. (codeLogix.txt)
    1. Input validation
    2. Transformation algorithm
    3. Output generation
2. Watch some TypeScript tutorials or courses to get comfortable with the fundamentals.
3. Let's get it TypeScripted!

# Usage
Run the program by entering the following command in the root folder:
```
npm run start
```

or build the .js files first and then run with node;
```
npm run build
node build/main.js
```

The program reads from standard input. It's recommended to pipe a file with testcases to the executable, e.g.:
```
cat test.txt | npm run start
```

I've added some maps and a map generator script in the /test_maps folder. Generate your own test map:
```
./map_gen.pl (x) (y) (density)
```
where x y and density are all integers, and the density is a number between 0 and 2 * y. The higher the density, the more black pixels there are.