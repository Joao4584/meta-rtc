"use client";

import React, { useState } from "react";
import ContentComponentPage from "@/modules/dashboard/components/card/ContentPage";
import ProfileComponent from "../components/Profile";
import PasswordEditComponent from "../components/PasswordEdit";

export default function Profile() {
 

  return (
    <React.Fragment>
      <ContentComponentPage>
        <ProfileComponent />
      </ContentComponentPage>
      <ContentComponentPage className="pt-0">
          <PasswordEditComponent />
      </ContentComponentPage>
    </React.Fragment>
  );
}
