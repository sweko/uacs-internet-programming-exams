import React from "react";

const Ingredients = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center mb-5">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            All Recipes
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="grid gap-4 md:grid-cols-5"></div>
        </div>
      </section>
    </main>
  );
};

export default Ingredients;
