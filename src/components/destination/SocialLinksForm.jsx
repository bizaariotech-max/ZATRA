import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";

const SocialLinksForm = ({ initialLinks = {}, onChange }) => {
  const [socialLinks, setSocialLinks] = useState({
    LiveFeedUrl: initialLinks?.LiveFeedUrl || "",
    WebSiteUrl: initialLinks?.WebSiteUrl || "",
    WikipediaUrl: initialLinks?.WikipediaUrl || "",
    FacebookPageUrl: initialLinks?.FacebookPageUrl || "",
    InstagramPageUrl: initialLinks?.InstagramPageUrl || "",
    LinkedinPageUrl: initialLinks?.LinkedinPageUrl || "",
    YouTubeChannelUrl: initialLinks?.YouTubeChannelUrl || "",
    WhatsAppCommunityUrl: initialLinks?.WhatsAppCommunityUrl || "",
    TelegramUrl: initialLinks?.TelegramUrl || "",
  });

  // sync local state with parent
  useEffect(() => {
    onChange(socialLinks);
  }, [socialLinks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Live Feed URL"
            name="LiveFeedUrl"
            value={socialLinks.LiveFeedUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="Website URL"
            name="WebSiteUrl"
            value={socialLinks.WebSiteUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="Wikipedia URL"
            name="WikipediaUrl"
            value={socialLinks.WikipediaUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="Facebook Page URL"
            name="FacebookPageUrl"
            value={socialLinks.FacebookPageUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="Instagram Page URL"
            name="InstagramPageUrl"
            value={socialLinks.InstagramPageUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="LinkedIn Page URL"
            name="LinkedinPageUrl"
            value={socialLinks.LinkedinPageUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="YouTube Channel URL"
            name="YouTubeChannelUrl"
            value={socialLinks.YouTubeChannelUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="WhatsApp Community URL"
            name="WhatsAppCommunityUrl"
            value={socialLinks.WhatsAppCommunityUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <FormInput
            label="Telegram URL"
            name="TelegramUrl"
            value={socialLinks.TelegramUrl}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default SocialLinksForm;
