"use client";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/textarea";

interface IntroInputProps {
  intro: string;
  onChange: (intro: string) => void;
}

export const IntroInput: React.FC<IntroInputProps> = ({ intro, onChange }) => {
  return (
    <div className="mt-2 flex flex-col">
      <TextArea
        placeholder="자기소개"
        maxLength={150}
        resize="none"
        className="min-h-32"
        value={intro}
        onChange={(e) => {
          if (e.target.value.length <= 150) {
            onChange(e.target.value);
          }
        }}
      />
      <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
        {intro.length}/150
      </Text>
    </div>
  );
};
