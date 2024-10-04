import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            About
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="sm:w-[70%] w-full grid sm:grid-cols-2 gap-x-10 text-xl sm:px-4 px-2">
            <Card>
              <CardHeader>
                <CardTitle>Blagoja Blazhevski</CardTitle>
                <hr />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Student ID: 5373 | Email: bblagoja@outlook.com
                </p>
                <hr className="h-px my-4 bg-gray-200 border-0" />
                <p>
                  UACS - {new Date().getFullYear()} -&nbsp;
                  <Link
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                    href="https://github.com/blagojablazhevski/uacs-internet-programming-exams/tree/main/part-time/code/5373-blagoja-blazevski/final-exam-internet-programming"
                  >
                    GitHub Repo
                  </Link>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Behind the scenes</CardTitle>
                <hr />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dependencies:{" "}
                  <Link
                    href={"https://github.com/axios/axios"}
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                  >
                    axios
                  </Link>{" "}
                  |{" "}
                  <Link
                    href={"https://github.com/react-hook-form/react-hook-form"}
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                  >
                    react-hook-form
                  </Link>
                  |{" "}
                  <Link
                    href={"https://github.com/typicode/json-server"}
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                  >
                    json-server
                  </Link>{" "}
                  |{" "}
                  <Link
                    href={"https://ui.shadcn.com/docs/components/card"}
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                  >
                    {" "}
                    shadcn/Card
                  </Link>{" "}
                  |{" "}
                  <Link
                    href={"https://github.com/tailwindlabs/tailwindcss"}
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                  >
                    tailwindcss
                  </Link>
                </p>
                <hr className="h-px my-4 bg-gray-200 border-0" />
                <p>
                  Powered by:{" "}
                  <Link
                    className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                    href="https://nextjs.org/docs"
                  >
                    NEXT.js
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
