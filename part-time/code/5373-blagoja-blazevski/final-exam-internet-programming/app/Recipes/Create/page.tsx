"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import useFetchData from "@/utils/CallAxiosMethod";
import { IIngredient, IRecipe } from "@/utils/CommonInterfaces";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const NewRecipe = () => {
  // const [data, setData] = useState<IRecipe>();
  const ddInstance = useRef<HTMLSelectElement>(null);
  const [cuisines, setCuisines] = useState<string[]>();

  const cuisinesRes = useFetchData({
    objectName: "cuisines",
    method: "GET",
  });

  useEffect(() => {
    if (!cuisinesRes.isLoading) {
      if (cuisinesRes.status === 200) {
        setCuisines(cuisinesRes.data as string[]);
      }
    }
  });

  const renderIngredients = () => {
    const data = getValues();
    return data.ingredients.map((ingredient, index) => (
      <div key={index} className="grid grid-cols-3">
        <Controller
          //@ts-ignore
          name={`ingredients[${index}].name`}
          rules={{ required: "Ingredient name is required" }}
          control={control}
          render={({ field, fieldState }) => (
            <Input
              invalid={fieldState.invalid}
              invalidMessage={fieldState.error?.message}
              name="ingredient_name"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          //@ts-ignore
          name={`ingredients[${index}].quantity`}
          control={control}
          render={({ field, fieldState }) => (
            <Input
              invalid={fieldState.invalid}
              type="number"
              invalidMessage={fieldState.error?.message}
              name="ingredient_quantity"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="grid grid-cols-8">
          <div className="md:col-span-7 col-span-5">
            <Controller
              //@ts-ignore
              name={`ingredients[${index}].unit`}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  invalid={fieldState.invalid}
                  invalidMessage={fieldState.error?.message}
                  name="ingredient_unit"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Button
              className="h-50 self-center text-xs"
              onClick={() => {
                console.log("Remove ingredient");

                const updatedIngredients = [...(data?.ingredients || [])];
                updatedIngredients.splice(index, 1);
                reset({ ...data, ingredients: updatedIngredients });
              }}
            >
              X
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  const defaultValues = {
    cuisine: "",
    description: "",
    ingredients: [],
    instructions: "",
    servings: 1,
    time: 0,
    title: "",
  };

  useEffect(() => {
    if (cuisines) {
      setValue("cuisine", cuisines[0]);
    }
  }, [cuisines]);

  const { handleSubmit, getValues, reset, control, setValue } = useForm({
    defaultValues: defaultValues as Omit<IRecipe, "id">,
  });

  const addIngredient = () => {
    const data = getValues();
    const updatedIngredients: IIngredient[] = [...(data?.ingredients || [])];
    updatedIngredients.push({ name: "", quantity: 0, unit: "" });
    console.log(updatedIngredients);
    setValue("ingredients", updatedIngredients);
    reset({ ...data, ingredients: updatedIngredients });
  };

  const handleCreate = async () => {
    const data = getValues();
    console.log(data);

    const res = await axios("http://localhost:2999/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    if (res.status === 201) {
      const jsonResponse = await res.data;
      console.log("Recipe created successfully");
      console.log(jsonResponse);
      if (jsonResponse.id) {
        window.location.href = `/Recipes/${jsonResponse.id}`;
      }
    } else {
      console.log("Error creating recipe");
      console.log(res);
    }
  };

  return (
    <main className="flex-1">
      <section className="w-full pt-16 lg:pt-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Create New Recipe
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex-col grid sm:grid-cols-2">
          <Controller
            name="title"
            rules={{ required: "Title is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                invalid={fieldState.invalid}
                invalidMessage={fieldState.error?.message}
                name="recipe_title"
                caption="✏️ Title"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="cuisine"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                ref={ddInstance}
                name="Test"
                options={cuisines}
                value={field.value}
                caption="🌍 Cuisine"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  console.log(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />

          <Controller
            name="time"
            control={control}
            rules={{
              required: "Time is required",
              min: { value: 1, message: "Time must be greater than 0" },
            }}
            render={({ field, fieldState }) => (
              <Input
                type="number"
                name="recipe_prep"
                invalid={fieldState.invalid}
                invalidMessage={fieldState.error?.message}
                caption="🕛 Preparation Time (Minutes)"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="servings"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="number"
                name="recipe_servings"
                invalid={fieldState.invalid}
                invalidMessage={fieldState.error?.message}
                caption="🍽️ Servings"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              invalid={fieldState.invalid}
              invalidMessage={fieldState.error?.message}
              name="recipe_desc"
              caption="🔍 Description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <label className="block text-gray-700 text-sm font-bold sm:px-4 px-2">
          🥕 Ingredients
        </label>
        <hr className="h-px my-8 bg-gray-200 border-0 mt-2 mb-3" />
        {getValues().ingredients.length > 0 ? (
          <>
            <div className="grid grid-cols-3">
              <label className="block text-gray-700 text-sm font-bold sm:px-4 px-2">
                Name
              </label>
              <label className="block text-gray-700 text-sm font-bold sm:px-4 px-2">
                Quantity
              </label>
              <label className="block text-gray-700 text-sm font-bold sm:px-4 px-2">
                Unit
              </label>
            </div>
            {renderIngredients()}
          </>
        ) : (
          <p className="text-center mb-2">No ingredients added...</p>
        )}
        <div className="flex md:px-4 px-2 w-full mb-3 justify-center">
          <Button
            className="md:w-72 w-full"
            style="positive"
            onClick={addIngredient}
          >
            +
          </Button>
        </div>
        <Controller
          name="instructions"
          control={control}
          rules={{
            required: "Instructions are required",
            minLength: {
              value: 5,
              message: "Instructions must be at least 5 characters long",
            },
          }}
          render={({ field, fieldState }) => (
            <TextArea
              invalid={fieldState.invalid}
              invalidMessage={fieldState.error?.message}
              name="recipe_instr"
              caption="📃 Instructions"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <hr className="h-px my-8 bg-gray-200 border-0 mt-2 mb-3" />
        <div className="flex md:px-4 px-2 w-full justify-center mb-3">
          <Button
            className="md:w-72 w-full"
            style="primary"
            onClick={handleSubmit(handleCreate)}
          >
            Save
          </Button>
        </div>
      </section>
      <section className="w-full md:px-4 px-2"></section>
    </main>
  );
};

export default NewRecipe;
