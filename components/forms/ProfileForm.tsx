"use client";
import React from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useRouter, usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

interface ProfileFormProps {
  clerkId: string;
  user: string;
}

const ProfileForm = ({ clerkId, user }: ProfileFormProps) => {
  const parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: parsedUser.user?.name || "",
      portfolio_link: parsedUser.user?.portfolioWebsite || "",
      location: parsedUser.user?.location || "",
      bio: parsedUser.user?.bio || "",
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    try {
      await updateUser({
        clerkId,
        updatedData: {
          name: values.name,
          portfolioWebsite: values.portfolio_link,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Полное Имя <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio_link"
          render={({ field }) => (
            <FormItem className="space-y-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">Вебсайт</FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  type="url"
                  placeholder="https://ruoverflow.ru/"
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">Локация</FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  placeholder="Санкт-Петербург, Россия"
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">О себе</FormLabel>
              <FormControl className="mt-3.5">
                <Textarea
                  placeholder="FrontEnd developer"
                  className="pt-3 no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[76px] border"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={`-mt-5 primary-gradient !text-light-900 w-fit`}
          >
            {isSubmitting ? "Сохранение.." : "Сохранить"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ProfileForm;
