import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./AddStreamerForm.module.scss";
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";
import { Dropdown } from "@/shared/ui/Dropdown";
import { DropdownItem } from "@/shared/ui/Dropdown";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AddStreamerArgs, addStreamer } from "../model/services/add-streamer";
import { Platform } from "@/shared/consts/platform";
import { Note } from "@/shared/ui/Note";
import { useMutation } from "@tanstack/react-query";
import { useAddStreamer } from "../model/lib/user-add-streamer";

interface AddStreamerFormProps {
  className?: string;
  onAddStreamer?: () => void;
}

const options: DropdownItem<Platform>[] = [
  { value: Platform.KICK, content: "Kick" },
  { value: Platform.RUMBLE, content: "Rumble" },
  { value: Platform.TIKTOK, content: "TikTok" },
  { value: Platform.TWITCH, content: "Twitch" },
  { value: Platform.YOUTUBE, content: "Youtube" },
];

/**
 * @feature AddStreamerForm
 */
export const AddStreamerForm: FC<AddStreamerFormProps> = memo((props) => {
  const { className, onAddStreamer } = props;

  const { control, error, errors, handleSubmit, isLoading, mutate, register } =
    useAddStreamer(onAddStreamer);

  const errorNote = error ? <Note message="Error adding streamer" /> : null;

  return (
    <form
      onSubmit={handleSubmit(mutate as SubmitHandler<AddStreamerArgs>)}
      className={classNames(cls.AddStreamerForm, {}, [className])}
    >
      {errorNote}
      <Heading label="Add new streamer" />
      <Label label="Name">
        <Input
          {...register("name", {
            required: {
              message: "Please provide name",
              value: true,
            },
            minLength: {
              message: "Min name length is 3",
              value: 3,
            },

            maxLength: {
              message: "Max name length is 50",
              value: 50,
            },
          })}
        />
        {errors.name && <Note message={errors.name.message} />}
      </Label>
      <Label label="Platform">
        <Controller
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={options}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="platform"
          control={control}
        />
      </Label>
      <Label label="Description">
        <Textarea
          {...register("description", {
            required: {
              message: "Please provide description",
              value: true,
            },
            minLength: {
              value: 3,
              message: "Min length of description is 3",
            },
            maxLength: {
              value: 255,
              message: "Max length of description is 255",
            },
          })}
        />
        {errors.description && <Note message={errors.description.message} />}
      </Label>
      <Button disabled={isLoading} isLoading={isLoading}>
        Add new streamer
      </Button>
    </form>
  );
});
