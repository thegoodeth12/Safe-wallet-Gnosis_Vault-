Create a new deployment

Copy page

Create a new deployment with all the required and intended data. If the deployment is not a git deployment, all files must be provided with the request, either referenced or inlined. Additionally, a deployment id can be specified to redeploy a previous deployment.
POST
/
v13
/
deployments
createDeployment

Copy

Ask AI
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await vercel.deployments.createDeployment({
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug",
    requestBody: {
      deploymentId: "dpl_2qn7PZrx89yxY34vEZPD31Y9XVj6",
      files: [
        {
          data: "<value>",
          file: "folder/file.js",
        },
      ],
      gitMetadata: {
        remoteUrl: "https://github.com/vercel/next.js",
        commitAuthorName: "kyliau",
        commitAuthorEmail: "kyliau@example.com",
        commitMessage: "add method to measure Interaction to Next Paint (INP) (#36490)",
        commitRef: "main",
        commitSha: "dc36199b2234c6586ebe05ec94078a895c707e29",
        dirty: true,
      },
      gitSource: {
        ref: "main",
        repoUuid: "123e4567-e89b-12d3-a456-426614174000",
        sha: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
        type: "bitbucket",
        workspaceUuid: "987e6543-e21b-12d3-a456-426614174000",
      },
      meta: {
        "foo": "bar",
      },
      name: "my-instant-deployment",
      project: "my-deployment-project",
      projectSettings: {
        buildCommand: "next build",
        installCommand: "pnpm install",
      },
      target: "production",
    },
  });

  console.log(result);
}

run();

200

400

401

402

403

404

409

500

Copy

Ask AI
{
  "error": {
    "code": "<string>",
    "message": "<string>"
  }
}
Authorizations
​
Authorization
stringheaderrequired
Default authentication mechanism
Query Parameters
​
forceNew
enum<string>
Forces a new deployment even if there is a previous similar deployment
Available options: 0, 1 
​
skipAutoDetectionConfirmation
enum<string>
Allows to skip framework detection so the API would not fail to ask for confirmation
Available options: 0, 1 
​
teamId
string
The Team identifier to perform the request on behalf of.
Example:
"team_1a2b3c4d5e6f7g8h9i0j1k2l"
​
slug
string
The Team slug to perform the request on behalf of.
Example:
"my-team-url-slug"
Body
application/json
​
name
stringrequired
A string with the project name used in the deployment URL
Example:
"my-instant-deployment"
​
customEnvironmentSlugOrId
string
Deploy to a custom environment, which will override the default environment
​
deploymentId
string
An deployment id for an existing deployment to redeploy
Example:
"dpl_2qn7PZrx89yxY34vEZPD31Y9XVj6"
​
files
(InlinedFile · object | UploadedFile · object)[]
A list of objects with the files to be deployed
InlinedFile
UploadedFile
Show child attributes
​
gitMetadata
object
Populates initial git metadata for different git providers.
Show child attributes
​
gitSource
object
Defines the Git Repository source to be deployed. This property can not be used in combination with files.
Option 1
Option 2
Option 3
Option 4
Option 5
Show child attributes
​
meta
object
An object containing the deployment's metadata. Multiple key-value pairs can be attached to a deployment
Show child attributes
Example:
{ "foo": "bar" }
​
monorepoManager
string | null
The monorepo manager that is being used for this deployment. When null is used no monorepo manager is selected
​
project
string
The target project identifier in which the deployment will be created. When defined, this parameter overrides name
Example:
"my-deployment-project"
​
projectSettings
object
Project settings that will be applied to the deployment. It is required for the first deployment of a project and will be saved for any following deployments
Show child attributes
​
target
string
Either not defined, staging, production, or a custom environment identifier. If staging, a staging alias in the format <project>-<team>.vercel.app will be assigned. If production, any aliases defined in alias will be assigned. If omitted, the target will be preview.
Example:
"production"
​
withLatestCommit
boolean
When true and deploymentId is passed in, the sha from the previous deployment's gitSource is removed forcing the latest commit to be used.
Response
200

application/json
The successfully created deployment
​
build
objectrequired
Show child attributes
​
env
string[]required
​
inspectorUrl
string | nullrequired
​
isInConcurrentBuildsQueue
booleanrequired
​
isInSystemBuildsQueue
booleanrequired
​
projectSettings
objectrequired
Show child attributes
​
aliasAssigned
booleanrequired
​
bootedAt
numberrequired
​
buildingAt
numberrequired
​
buildSkipped
booleanrequired
​
creator
objectrequired
Show child attributes
​
public
booleanrequired
​
status
enum<string>required
Available options: CANCELED, ERROR, QUEUED, BUILDING, INITIALIZING, READY 
​
id
stringrequired
​
name
stringrequired
​
createdAt
numberrequired
​
type
enum<string>required
Available options: LAMBDAS 
​
version
enum<number>required
Available options: 2 
​
meta
objectrequired
Show child attributes
​
readyState
enum<string>required
Available options: CANCELED, ERROR, QUEUED, BUILDING, INITIALIZING, READY 
​
regions
string[]required
​
url
stringrequired
​
projectId
stringrequired
​
ownerId
stringrequired
​
plan
enum<string>required
Available options: pro, enterprise, hobby 
​
routes
object[] | nullrequired
Option 1
Option 2
Option 3
Show child attributes
​
createdIn
stringrequired
​
aliasAssignedAt

​
alwaysRefuseToBuild
boolean
​
buildArtifactUrls
string[]
​
builds
object[]
Show child attributes
​
readyStateReason
string
​
integrations
object
Show child attributes
​
images
object
Show child attributes
​
alias
string[]
​
buildContainerFinishedAt
number
Since April 2025 it necessary for On-Demand Concurrency Minutes calculation
​
initReadyAt
number
​
isFirstBranchDeployment
boolean
​
lambdas
object[]
Show child attributes
​
ready
number
​
team
object
Show child attributes
​
userAliases
string[]
​
previewCommentsEnabled
boolean
​
ttyBuildLogs
boolean
​
customEnvironment
object
Internal representation of a custom environment with all required properties
Option 1
Option 2
Show child attributes
​
oomReport
enum<string>
Available options: out-of-memory 
​
deletedAt
number | null
​
autoAssignCustomDomains
boolean
applies to custom domains only, defaults to true
​
gitSource
object
Option 1
Option 2
Option 3
Option 4
Option 5
Option 6
Option 7
Option 8
Option 9
Option 10
Option 11
Option 12
Show child attributes
​
project
object
Show child attributes
​
source
enum<string>
Available options: cli, git, import, import/repo, clone/repo, api-trigger-git-deploy, redeploy, v0-web 
​
target
enum<string> | null
Available options: production, staging 
​
errorMessage
string | null
​
passiveRegions
string[]
Since November 2023 this field defines a set of regions that we will deploy the lambda to passively Lambdas will be deployed to these regions but only invoked if all of the primary regions are marked as out of service
​
aliasWarning
object | null
Show child attributes
​
aliasError
object | null
Show child attributes
​
aliasFinal
string | null
​
automaticAliases
string[]
​
buildErrorAt
number
​
checksState
enum<string>
Available options: registered, running, completed 
​
checksConclusion
enum<string>
Available options: succeeded, failed, skipped, canceled 
​
defaultRoute
string
Computed field that is only available for deployments with a microfrontend configuration.
​
canceledAt
number
​
errorCode
string
​
errorLink
string
​
errorStep
string
​
originCacheRegion
string
​
readySubstate
enum<string>
Substate of deployment when readyState is 'READY' Tracks whether or not deployment has seen production traffic: - STAGED: never seen production traffic - ROLLING: in the process of having production traffic gradually transitioned. - PROMOTED: has seen production traffic
Available options: STAGED, ROLLING, PROMOTED 
​
softDeletedByRetention
boolean
​
undeletedAt
number
​
oidcTokenClaims
object
Show child attributes
​
monorepoManager
string | null
​
config
object
Since February 2025 the configuration must include snapshot data at the time of deployment creation to capture properties for the /deployments/:id/config endpoint utilized for displaying Deployment Configuration on the frontend This is optional because older deployments may not have this data captured
Show child attributes
​
functions
object | null
Show child attributes
​
crons
object[]
Show child attributes
​
checks
object
Show child attributes
​
microfrontends
object
Option 1
Option 2
Show child attributes
​
connectBuildsEnabled
boolean
​
connectConfigurationId
string
​
passiveConnectConfigurationId
string
Since November 2023 this field defines a Secure Compute network that will only be used to deploy passive lambdas to (as in passiveRegions)
​
gitRepo
object
Option 1
Option 2
Option 3
