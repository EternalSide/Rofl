"use client";
import { useForm } from "react-hook-form";
import { useTheme } from "@/context/ThemeProvider";
import { useRef, useState } from "react";

import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AnswerForm = ({ authorId, questionId, question }: any) => {
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const { isSubmitting } = form.formState;

  const [isAiSubmitting, setIsAiSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    try {
      await createAnswer({
        content: values.answer,
        author: authorId,
        path: pathname,
        question: questionId,
      });
      form.resetField("answer");
    } catch (e) {
      console.log(e);
    }
  };

  const generateAiAnswer = async (): Promise<void> => {
    if (!authorId) return;
    setIsAiSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      const answer = await res.json();
      alert(answer.reply);

      // await createAnswer({
      //   content: values.answer,
      //   author: authorId,
      //   path: pathname,
      //   question: questionId,
      // });
      // form.resetField("answer");
    } catch (e) {
      console.log(e);
    } finally {
      setIsAiSubmitting(false);
    }
  };

  if (!authorId) {
    return (
      <Link className="mt-4 text-center block" href="/sign-in">
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Войдите, чтобы оставить комментарий
        </Button>
      </Link>
    );
  }
  return (
    <>
      <div className="flex mt-8 justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Добавьте комментарий</h4>
        <Button
          onClick={generateAiAnswer}
          className="shadow-none dark:text-primary-500 btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500"
        >
          <Image width={12} height={12} className="object-contain" alt="star" src="/assets/icons/stars.svg" />
          Добавить ответ ChatGPT
        </Button>
      </div>
      <Form {...form}>
        <form className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style: "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={isSubmitting} className="primary-gradient w-fit !text-light-900" type="submit">
              {isSubmitting ? "Отправляю 🚀" : "Отправить"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default AnswerForm;
