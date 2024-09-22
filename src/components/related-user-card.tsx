import { type RelatedUser } from "@/lib/types";
import { InfoCard } from "./info-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type RelatedUserCardProps = {
  relatedUser: RelatedUser;
};

export const RelatedUserCard = ({ relatedUser }: RelatedUserCardProps) => {
  if (!relatedUser) return null;
  return (
    <InfoCard>
      <div className="flex">
        <Avatar className="mr-4 h-10 w-10">
          <AvatarImage
            src={relatedUser.avatar ?? ""}
            alt={relatedUser.name ?? ""}
          />
          <AvatarFallback className="bg-gray-600">
            {relatedUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-gray-900 dark:text-white">{relatedUser.name}</p>
          {relatedUser.email && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: {relatedUser.email}
            </p>
          )}
        </div>
      </div>
    </InfoCard>
  );
};
